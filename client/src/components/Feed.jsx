import React from 'react'
import { Feed, Icon } from 'semantic-ui-react'
import moment from 'moment'

const FeedExampleIconLabel = ({post:{body,createdAt}}) => (
  <Feed>
    <Feed.Event>
      <Feed.Label>
        <Icon name='pencil' />
      </Feed.Label>
      <Feed.Content>
        <Feed.Date>{moment(createdAt).fromNow()}</Feed.Date>
        <Feed.Summary>
          {body}
        </Feed.Summary>
      </Feed.Content>
    </Feed.Event>
  </Feed>
)

export default FeedExampleIconLabel
