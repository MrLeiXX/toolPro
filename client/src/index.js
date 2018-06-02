import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import App from './component/App';

const Root = () => (
    <Router>
        <Route path="/" component={App} />
    </Router>
);
ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
