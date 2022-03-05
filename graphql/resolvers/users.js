const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const User = require("../../model/User");
const { SECRET } = require("../../config");
const {
  validateUserRegisterInput,
  validateUserLoginInput,
} = require("../../utils/validators");
const checkAuth = require("../../utils/checkAuth");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Query: {
    async getUser(_, { userId }) {
      console.log("before");
      try {
        const user = await User.findById(userId);
        if (user !== null) {
          return user;
        }
      } catch (err) {
        console.log("error", err);
      }
    },
  },

  Mutation: {
    // FOR USER LOGIN
    async login(_, { username, password }, context, info) {
      const { errors, isValid } = validateUserLoginInput(username, password);

      if (!isValid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });
      if (!user) {
        errors.general = "Incorrect Username or Password";
        throw new UserInputError("Incorrect Username or password", { errors });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        errors.general = "Incorrect Username or Password";
        throw new UserInputError("Incorrect Username or Password", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    // FOR USER REGISTRATION
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      // VALIDATE USER INPUT
      const { errors, isValid } = validateUserRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!isValid) {
        throw new UserInputError("Errors", { errors });
      }

      // HASH PASSWORD
      password = await bcrypt.hash(password, 12);

      // MAKE SURE USER DOES'NT EXIST ALREADY
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },

    async follow(_, { userId }, context) {
      const user = checkAuth(context);
      if (user.id !== userId) {
        try {
          const otherUser = await User.findById(userId);
          const me = await User.findById(user.id);

          if (!otherUser.followers.includes(user.id)) {
            await otherUser.updateOne({ $push: { followers: user.id } });
            await me.updateOne({ $push: { followings: userId } });
            await otherUser.save();
            await me.save();
            return "user Followed";
          } else {
            return "you already follow him";
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        return "You cannot follow yourself";
      }
    },

    async unFollow(_, { userId }, context) {
      const user = checkAuth(context);
      if (user.id !== userId) {
        try {
          const otherUser = await User.findById(userId);
          const me = await User.findById(user.id);

          if (otherUser.followers.includes(user.id)) {
            await otherUser.updateOne({ $pull: { followers: user.id } });
            await me.updateOne({ $pull: { followings: userId } });
            await otherUser.save();
            await me.save();
            return "user Unfollowed";
          } else {
            return "you already unfollow him";
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        return "You cannot unfollow yourself";
      }
    },
  },
};
