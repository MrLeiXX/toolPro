import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import App from './component/App';
import Iplocation from './component/Iplocation';

const Root = () => (
    <Router>
        <div>
            <Switch>
                <Route path="/" component={App}/>
                <Route path='/Iplocation' component={Iplocation} />
            </Switch>
        </div>
    </Router>
);
ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
