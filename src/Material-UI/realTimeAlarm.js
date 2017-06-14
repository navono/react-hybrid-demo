/*
 * @Author: Ping Qixing
 * @Date: 2017-06-13 13:29:01
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-06-14 09:44:35
 *
 * @Description
 * real time alarm control
 */
import React, { Component } from 'react';
import { RaisedButton, Dialog, FlatButton, List, ListItem, Subheader, Divider } from 'material-ui';
import { ContentInbox, ActionGrade } from 'material-ui/svg-icons';
import { colors, getMuiTheme, MuiThemeProvider, darkBaseTheme, lightBaseTheme } from 'material-ui/styles';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

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
        'background-color': '#fff',
        'color': '#333',
        'border': '1px solid gray',
        'line-height': '130%'
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
        'background-color': '#ddd',
        'border-bottom': '1px solid gray'
    },
    filterTree: {
        'textAlign': 'left',
        'float': 'left',
        'width': '20%',
        'margin': 0
    },
    filterTreeSubHeader: {
        'textAlign': 'left'
    },
    alarmContent: {
        'margin-left': '20%',
        'border-left': '1px solid gray',
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

const buttonStyle = {
    'margin': 7
}

// const muiTheme = getMuiTheme({
//     palette: {
//         accent1Color: colors.deepOrange500
//     }
// });

const muiTheme = getMuiTheme(lightBaseTheme);

class ControlHeader extends Component {
    constructor (props, context) {
        super(props, context);
    }

    render () {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.header}>
                    <h1 style={styles.noPaddingMargin}><b>Realtime Alarm Control</b></h1>
                </div>
            </MuiThemeProvider>
        )
    }
}

class FilterTree extends Component {
    constructor (props, context) {
        super(props, context);
    }

    render () {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.filterTree}>
                     <List style={{'width': '100%'}}>
                        <Subheader style={styles.filterTreeSubHeader}>报警过滤</Subheader>
                        <Divider />
                        <ListItem primaryText='PLC' leftIcon={<ContentInbox />} />
                        <ListItem primaryText='优先级' leftIcon={<ActionGrade />}
                            primaryTogglesNestedList={true}
                            nestedItems={[
                                <ListItem primaryText='优先级31' leftIcon={<ActionGrade />}/>
                            ]}
                            />
                    </List>
                </div>
            </MuiThemeProvider>
        )
    }
}

class AlarmOperation extends Component {
    constructor (props, context) {
        super(props, context);
        this.state = {
            alarmPrint: false
        }
    }

    onPrint () {
        console.log('print alarm');
        this.setState({
            alarmPrint: true
        })
    }

    onPrintDlgClose () {
        this.setState({
            alarmPrint: false
        })
    }

    onAck () {
        console.log('ack alarm');
    }

    onFreeze () {
        console.log('freeze alarm');
    }

    render () {
        const standardActions = [
            <FlatButton
                label='OK'
                primary={true}
                onTouchTap={this.onPrintDlgClose.bind(this)}
            />,
            <FlatButton
                label='CANCEL'
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.onPrintDlgClose.bind(this)}
            />
        ];

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.noPaddingMargin}>
                    <Dialog
                        title="打印"
                        actions={standardActions}
                        open={this.state.alarmPrint}
                        modal={false}
                        onRequestClose={this.onPrintDlgClose.bind(this)}>准备打印报警！</Dialog>

                    <RaisedButton label='确认' style={buttonStyle} primary={true} onTouchTap={this.onAck.bind(this)}/>
                    <RaisedButton label='冻结' style={buttonStyle} primary={true} onTouchTap={this.onFreeze.bind(this)}/>
                    <RaisedButton label='打印' style={buttonStyle} secondary={true} onTouchTap={this.onPrint.bind(this)}/>
                </div>
            </MuiThemeProvider>
        )
    }
}

class AlarmList extends Component {
    constructor (props, context) {
        super(props, context);
        this.state = {
            selected: []
        };
        this.handleRowSelection = this.handleRowSelection.bind(this);
    }

    isSelected (index) {
        return this.state.selected.indexOf(index) !== -1;
    }

    handleRowSelection (selectedRows) {
        this.setState({
            selected: selectedRows
        });
    }

    render () {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <AlarmOperation />
                    <Table onRowSelection={this.handleRowSelection} multiSelectable={true}>
                        {/* <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>ID</TableHeaderColumn>
                                <TableHeaderColumn>Name</TableHeaderColumn>
                                <TableHeaderColumn>Status</TableHeaderColumn>
                            </TableRow>
                        </TableHeader> */}
                        <TableBody showRowHover={true}>
                            {this.props.alarmItems.map((row, index) => (
                                <TableRow key={index} selected={this.isSelected(index)}>
                                    {/* <TableRowColumn>{index}</TableRowColumn> */}
                                    <TableRowColumn>{row.tagName}</TableRowColumn>
                                    <TableRowColumn>{row.tagDesc}</TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </MuiThemeProvider>
        )
    }
}

class AlarmEntryInfo extends Component {
    constructor (props, context) {
        super(props, context)
    }

    render () {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={{'margin': 10}}>
                    <p>报警等级：</p>
                    <p>报警处置：</p>
                    <p>报警来源：</p>
                    <p>报警风险等级：</p>
                </div>
            </MuiThemeProvider>
        )
    }
}

class RealtimeAlarm extends Component {
    constructor (props, context) {
        super(props, context);
        this.state = {
            alarmItems: [
                {tagName: 'AA', tagDesc: 'This is a description'},
                {tagName: 'BB', tagDesc: 'This is a description'},
                {tagName: 'CC', tagDesc: 'This is a description'},
                {tagName: 'DD', tagDesc: 'This is a description'}
            ]
        }
    }

    render () {
        return (
            <MuiThemeProvider muiTheme={muiTheme} >
                <div style={styles.container}>
                    <ControlHeader />
                    <FilterTree />
                    <div style={styles.alarmContent}>
                        <AlarmList alarmItems={this.state.alarmItems}/>
                        <Divider />
                        <AlarmEntryInfo />
                    </div>

                </div>
            </MuiThemeProvider>
        )
    }
}

export default RealtimeAlarm;
