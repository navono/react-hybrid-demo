import React from 'react';
// import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';  // 必须的
// import 'bootstrap/dist/css/bootstrap-theme.css';  //  可选的
import App from './App';
// import './index.css';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

render(
    <App />,
    document.getElementById('root')
);
