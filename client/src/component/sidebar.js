import "./styles/sidebar.css";
import React, { useState } from 'react';
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
import {Link} from 'react-router-dom'


export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Dashboard</span>
          </li>
          <hr></hr>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
           <Link to="/userlist" className="sidebarListItemText">
              <span className="sidebarListItemText">Users list</span></Link>
          </li>
          <hr></hr>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <Link to="/plans" className="sidebarListItemText" > 
              <span className="sidebarListItemText">Plans</span></Link>
          </li>
         
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <Link to="/adonservices" className="sidebarListItemText" > 
            <span className="sidebarListItemText">Adon-Services</span></Link>
          </li>
          <hr></hr>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Employees</span>
          </li><hr></hr>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li><hr></hr>
        </ul>
        <button className="sidebarButton" 
        style={{ background: '-webkit-linear-gradient(40deg,rgb(2, 126, 95),#04524b, #023c5e)'
}}>Show More</button>
      
      
      </div>
    </div>
  );
}
