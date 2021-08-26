import React from 'react'
import { Container, Feed, Icon } from 'semantic-ui-react'
import moment from 'moment'
import {Link} from 'react-router-dom'

const FeedExampleIconLabel = ({post:{body, createdAt, id}}) => (
  <Container>
    <Feed>
      <Feed.Event>
        <Feed.Label>
          <Icon name='pencil' />
          </Feed.Label>
          <Feed.Content>
            <Feed.Date>{moment(createdAt).fromNow()}</Feed.Date>
            <Feed.Summary>
              <Link to={`/posts/${id}`}>{body}</Link>
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
      </Feed>
    </Container>
  )

export default FeedExampleIconLabel
