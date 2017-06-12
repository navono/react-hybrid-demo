import React from 'react';
import ReactDOM from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.css';  // 必须的
// import 'bootstrap/dist/css/bootstrap-theme.css';  //  可选的
import App from './App';
import TodoBox from './components/todoList';
import ListExampleBasic from './components/semantic-ui-demo';
import MyButtonController from './components/MyButtonController';

import './index.css';

// ReactDOM.render(<App />, document.getElementById('root'));

// ReactDOM.render(
//     <ListExampleBasic />,
//     document.getElementById('root')
// );

ReactDOM.render(
    <MyButtonController />,
    document.getElementById('root')
);
