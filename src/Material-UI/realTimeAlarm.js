/*
 * @Author: Ping Qixing
 * @Date: 2017-06-13 13:29:01
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-06-13 19:15:57
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

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: colors.deepOrange500
    }
});

class AlarmControlHeader extends Component {
    constructor (props, context) {
        super(props, context);
    }

    render () {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
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
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
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
    }

    onPrint () {
        console.log('print alarm');
    }

    onAck () {
        console.log('ack alarm');
    }

    onFreeze () {
        console.log('freeze alarm');
    }

    render () {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <div style={styles.noPaddingMargin}>
                            <RaisedButton label='确认' style={buttonStyle} primary={true} onTouchTap={this.onAck}/>
                            <RaisedButton label='冻结' style={buttonStyle} primary={true} onTouchTap={this.onFreeze}/>
                            <RaisedButton label='打印' style={buttonStyle} secondary={true} onTouchTap={this.onPrint}/>
                </div>
            </MuiThemeProvider>
        )
    }
}

class AlarmList extends Component {
    constructor (props, context) {
        super(props, context);
        this.state = {
            selected: [1]
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
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <Table onRowSelection={this.handleRowSelection}>
                    {/* <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Status</TableHeaderColumn>
                        </TableRow>
                    </TableHeader> */}
                    <TableBody>
                        <TableRow selected={this.isSelected(0)}>
                            <TableRowColumn>1</TableRowColumn>
                            <TableRowColumn>John Smith</TableRowColumn>
                            <TableRowColumn>Employed</TableRowColumn>
                        </TableRow>
                        <TableRow selected={this.isSelected(1)}>
                            <TableRowColumn>2</TableRowColumn>
                            <TableRowColumn>Randal White</TableRowColumn>
                            <TableRowColumn>Unemployed</TableRowColumn>
                        </TableRow>
                        <TableRow selected={this.isSelected(2)}>
                            <TableRowColumn>3</TableRowColumn>
                            <TableRowColumn>Stephanie Sanders</TableRowColumn>
                            <TableRowColumn>Employed</TableRowColumn>
                        </TableRow>
                        {/* <TableRow>
                            <TableRowColumn selected={this.isSelected(3)}>4</TableRowColumn>
                            <TableRowColumn>Steve Brown</TableRowColumn>
                            <TableRowColumn>Employed</TableRowColumn>
                        </TableRow> */}
                    </TableBody>
                </Table>
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
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <div>
                    <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut.
                    </p>
                </div>
            </MuiThemeProvider>
        )
    }
}

class RealtimeAlarm extends Component {
    constructor (props, context) {
        super(props, context);
    }

    render () {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)} >
                <div style={styles.container}>
                    <AlarmControlHeader />
                    <FilterTree />
                    <div style={styles.alarmContent}>
                        <AlarmOperation />
                        <AlarmList />
                        <Divider />
                        <AlarmEntryInfo />
                    </div>

                </div>
            </MuiThemeProvider>
        )
    }
}

export default RealtimeAlarm;
