import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import Land from './component/Land';

ReactDOM.render(<Land />, document.getElementById('root'));
registerServiceWorker();
