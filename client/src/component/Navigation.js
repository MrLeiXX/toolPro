import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../public/Navigation.css';
import navlog from '../public/nav.png';
import exitlog from '../public/exit.png';

class Navigation extends Component {
  render() {
    return (
      <div className="navigation">
        <div className="navTitle"><img src={navlog} alt="" />导航列表</div>
        <div className="navList">
          <NavLink to="/Iplocation" className="nav-a" activeStyle={{color: '#fff'}} >IP定位</NavLink>
          <NavLink to="/Iplocation2" className="nav-a" activeStyle={{color: '#fff'}} >管理中心</NavLink>
        </div>
        <div className="navFoot">2018 © Leihechao<a href="/tool/userexit"><img src={exitlog} alt="注销" title="注销" /></a></div>
      </div>
    );
  }
}

export default Navigation;