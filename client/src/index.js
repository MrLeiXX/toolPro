import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import App from './component/App';
import Iplocation from './component/Iplocation';
import BlogManage from './component/BlogManage';

const Root = () => (
    <Router>
        <div>
            <Route path="/" component={App}/>
            <Route path='/Iplocation' component={Iplocation}/>
            <Route path='/BlogManage' component={BlogManage}/>
        </div>
    </Router>
);
ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
