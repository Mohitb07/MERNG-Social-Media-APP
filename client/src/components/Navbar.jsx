import React, { useState, useContext } from 'react'
import { Container, Image, Menu } from 'semantic-ui-react'
import {Link, NavLink} from 'react-router-dom'
import '../App.css'

import { AuthContext } from '../context/auth';


export default function Navbar(){
    const {user, logout} = useContext(AuthContext)
    const pathname = window.location.pathname;
    const path = pathname === '/' ? 'home' : pathname.substr(1);
    const [activeItem, setActiveItem] = useState(path)
    
    
    const handleItemClick = (e, { name }) => setActiveItem(name)

    const nav = user ? (
      <Container>
      <Menu pointing secondary size="massive" color="teal">
            <Menu.Item
              name={user.username}
              active
              as={Link}
              to="/"
              icon="user"
            />
            {/* <Menu.Menu position="left">
              <Menu.Item>
                <div className="logo">
                <Image  as={NavLink} to="/" 
                  src={logo} size="small"
                />
                </div>
              </Menu.Item>
            </Menu.Menu> */}

            <Menu.Menu position='right'>
              <Menu.Item
                name='Logout'
                onClick={logout}
                icon="power off"
              />
            </Menu.Menu>
          </Menu>
          </Container>
    ) : (
      <Container>
      <Menu pointing secondary size="massive" color="teal">
            <Menu.Item
              name='home'
              active={activeItem === 'home'}
              onClick={handleItemClick}
              as={Link}
              to="/"
              icon="home"
            />
            <Menu.Menu position='right'>
              <Menu.Item
                name='login'
                active={activeItem === 'login'}
                onClick={handleItemClick}
                as={Link}
                to="/login"
                icon="user"
              />
              <Menu.Item
                name='register'
                active={activeItem === 'register'}
                onClick={handleItemClick}
                as={Link}
                to="/register"
                icon="paper plane"   
              />
            </Menu.Menu>
          </Menu>
          </Container>
    )
    
    
    return nav;
  }