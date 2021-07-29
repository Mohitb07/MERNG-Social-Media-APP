import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default function Navbar(){
    const pathname = window.location.pathname;
    const path = pathname === '/' ? 'home' : pathname.substr(1);
    const [activeItem, setActiveItem] = useState(path)

    
    
    const handleItemClick = (e, { name }) => setActiveItem(name)

    return  (
        <div>
          <Menu pointing secondary size="massive" color="teal">
            <Menu.Item
              name='home'
              active={activeItem === 'home'}
              onClick={handleItemClick}
              as={Link}
              to="/"
            />
            <Menu.Menu position='right'>
              <Menu.Item
                name='login'
                active={activeItem === 'login'}
                onClick={handleItemClick}
                as={Link}
                to="/login"
              />
              <Menu.Item
                name='register'
                active={activeItem === 'register'}
                onClick={handleItemClick}
                as={Link}
                to="/register"
              />
            </Menu.Menu>
          </Menu>
{/*   
          <Segment>
            <img src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
          </Segment> */}
        </div>
      )
  }