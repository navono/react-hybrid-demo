/*
 * @Author: Ping Qixing
 * @Date: 2017-06-15 17:07:50
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-06-15 19:35:57
 * @Description
 */
import React, {Component} from 'react';
import { Button, List, Icon, Table } from 'semantic-ui-react';

const styles = {
    container: {
        // 'textAlign': 'center',
        // 'border': '1px coral solid',
        // 'width': '100%',
        // 'height': '500px',
        // 'margin-left': 'auto',
        // 'margin-right': 'auto'
        'width': '90%',
        'margin': '10px auto',
        'backgroundColor': '#fff',
        'color': '#333',
        'border': '1px solid gray',
        'lineHeight': '130%'
    },
    header: {
        // 'height': '8%',
        // 'width': '100%',
        // 'border-radius': 25,
        // 'box-shadow': '10px 10px 5px #888888',
        // 'background': '#dddddd',
        // 'word-wrap': 'break-word',
        // 'line-height': 38
        'padding': '.5em',
        'textAlign': 'center',
        // 'line-height'
        'backgroundColor': '#ddd',
        'borderBottom': '1px solid gray'
    },
    filterTree: {
        'textAlign': 'left',
        // 'float': 'left',
        'width': '20%',
        'margin': 0
    },
    filterTreeSubHeader: {
        'textAlign': 'left'
    },
    alarmContent: {
        'marginLeft': '20%',
        'borderLeft': '1px solid gray',
        // 'background-color': '#ddd',
        'padding': '0 1em 1em 1em'
        // 'max-width': '36em'
    },
    noPaddingMargin: {
        // 'background-color': '#ddd',
        'padding': 0,
        'margin': 0
    }
};

class ControlHeader extends Component {
    constructor (props, context) {
        super(props, context);
    }

    render () {
        return (
            <div style={styles.header}>
                <p style={styles.noPaddingMargin}><b>Realtime Alarm Control</b></p>
            </div>
        )
    }
}

class FilterControl extends Component {
    constructor (props, context) {
        super(props, context);
    }

    render () {
        return (
            <div style={styles.filterTree}>
                <List selection>
                    <List.Item>
                        <List.Icon name='close' />
                        <List.Content header='所有报警' />
                    </List.Item>
                    <List.Item>
                        <List.Icon name='close' />
                        <List.Content header='优先级' />
                        <List.List>
                            <List.Item>
                                <List.Icon name='close' />
                                <List.Content header='优先级0' />
                            </List.Item>
                            <List.Item>
                                <List.Icon name='close' />
                                <List.Content header='优先级31' />
                            </List.Item>
                        </List.List>
                    </List.Item>
                </List>
            </div>
        )
    }
}

class SemanticAlarmControl extends Component {
    constructor (props, context) {
        super(props, context);
    }

    render () {
        return (
        <div>
            <div style={styles.container}>
                <ControlHeader />
                <FilterControl />
            </div>
        </div>
        )
    }
}

export default SemanticAlarmControl;
