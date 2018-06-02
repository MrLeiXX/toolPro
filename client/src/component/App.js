import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './Navigation';
import ShowIndex from './ShowIndex';
import Iplocation from './Iplocation';
import BlogManage from './BlogManage';

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <div>
            <Route path="/" exact component={ShowIndex}/>
            <Route path='/Iplocation' component={Iplocation}/>
            <Route path='/BlogManage' component={BlogManage}/>
        </div>
      </div>
    );
  }
}

export default App;
