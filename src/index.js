import React from 'react';
// import ReactDOM from 'react-dom';
import { render } from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.css';  // 必须的
// import 'bootstrap/dist/css/bootstrap-theme.css';  //  可选的
import App from './App';
import TodoBox from './Flux/components/todoList';
import ListExampleBasic, { ListExampleIcon } from './Semantic-UI/semantic-ui-demo';
import MyButtonController from './Flux/components/MyButtonController';

// import './index.css';
import MaterialMain from './Material-UI/material-ui-demo';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

// ReactDOM.render(<App />, document.getElementById('root'));

// ReactDOM.render(
//     <ListExampleIcon />,
//     document.getElementById('root')
// );

// ReactDOM.render(
//     <MyButtonController />,
//     document.getElementById('root')
// );

render(
    <MaterialMain />,
    document.getElementById('root')
);
