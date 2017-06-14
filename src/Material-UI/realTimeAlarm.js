/*
 * @Author: Ping Qixing
 * @Date: 2017-06-13 13:29:01
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-06-14 16:45:34
 *
 * @Description
 * real time alarm control
 */
import React, { Component } from 'react';
import { RaisedButton, Dialog, FlatButton, List, ListItem, makeSelectable, Subheader, Divider } from 'material-ui';
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
        'float': 'left',
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

let SelectableList = makeSelectable(List);
function wrapState (ComposedComponent) {
    class SelectableList extends Component {
        constructor (props, context) {
            super(props, context);
        }

        componentWillMount () {
            this.setState({
                selectedIndex: this.props.defaultValue
            });
        }

        handleRequestChange (event, index) {
            this.setState({
                selectedIndex: index
            });

            this.props.onChanged(index);
        }

        render () {
            return (
            <ComposedComponent
                value={this.state.selectedIndex}
                onChange={this.handleRequestChange.bind(this)}>
                {this.props.children}
            </ComposedComponent>)
        }
    }

    SelectableList.PropTypes = {
        children: React.PropTypes.node.isRequired,
        defaultValue: React.PropTypes.number.isRequired
    }

    return SelectableList;
}

SelectableList = wrapState(SelectableList);

class FilterTree extends Component {
    constructor (props, context) {
        super(props, context);
        this.state = {
            valueIndex: 0,
            items: []
        }
    }

    componentWillMount () {
        let items = this.createListItems(this.props.filterData);
        this.setState({
            items: items
        })
    }

    onSelectChanged (param) {
        this.props.onFilter(param);
    }

    createListItems (filterData) {
        // 无法使用Array的map，因为在map的过程中无法递归调用
        if (filterData !== 'undefined') {
            let items = [];
            for (var index = 0; index < filterData.length; index++) {
                var element = filterData[index];
                let nestedItem;
                if (element.subItems.length !== 0) {
                    nestedItem = this.createListItems(element.subItems);
                }

                if (element.icon === 'ContentInbox') {
                    if (element.subItems.length !== 0) {
                        items.push(<ListItem key={element} value={this.state.valueIndex}
                                             primaryText={element.name} leftIcon={<ContentInbox/>}
                                             primaryTogglesNestedList={true}
                                             nestedItems={nestedItem}/>);
                    } else {
                        items.push(<ListItem key={element} value={this.state.valueIndex}
                                             primaryText={element.name} leftIcon={<ContentInbox/>}
                                             nestedItems={nestedItem}/>);
                    }
                    this.state.valueIndex++;
                } else if (element.icon === 'ActionGrade') {
                    if (element.subItems.length !== 0) {
                        items.push(<ListItem key={element} value={this.state.valueIndex}
                                             primaryText={element.name} leftIcon={<ActionGrade/>}
                                             primaryTogglesNestedList={true}
                                             nestedItems={nestedItem}/>);
                    } else {
                        items.push(<ListItem key={element} value={this.state.valueIndex}
                                             primaryText={element.name} leftIcon={<ActionGrade/>}
                                             nestedItems={nestedItem}/>);
                    }
                    this.state.valueIndex++;
                }
            }
            return items;
        }
        return null;
    }

    render () {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.filterTree}>
                     <SelectableList style={{'width': '100%'}} onChanged={this.onSelectChanged.bind(this)}>
                        <Subheader style={styles.filterTreeSubHeader}>报警过滤</Subheader>
                        <Divider />
                        { this.state.items }
                    </SelectableList>
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
    }

    onAckAll () {
    }

    onFreeze () {
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
                    <RaisedButton label='确认所有' style={buttonStyle} primary={true} onTouchTap={this.onAckAll.bind(this)}/>
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

        this.props.onSelectedRows(selectedRows);
    }

    render () {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <AlarmOperation />
                    <Table onRowSelection={this.handleRowSelection} multiSelectable={true} height={'200'}>
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
        let itemName = this.props.currentSelected === null ? '' : this.props.currentSelected.tagName;
        let itemDesc = this.props.currentSelected === null ? '' : this.props.currentSelected.tagDesc;
        let priority = this.props.currentSelected === null ? '' : this.props.currentSelected.priority;
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={{'margin': 10}}>
                    <p>报警名称：{itemName}</p>
                    <p>报警描述：{itemDesc}</p>
                    <p>报警优先级：{priority}</p>
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
            currentShowItems: [
                {tagName: 'AA', tagDesc: 'This is AA description', priority: 0},
                // {tagName: 'BB', tagDesc: 'This is BB description', priority: 0},
                // {tagName: 'CC', tagDesc: 'This is CC description', priority: 0},
                // {tagName: 'DD', tagDesc: 'This is DD description', priority: 0},
                // {tagName: 'EE', tagDesc: 'This is EE description', priority: 31},
                // {tagName: 'FF', tagDesc: 'This is FF description', priority: 31},
                // {tagName: 'GG', tagDesc: 'This is GG description', priority: 31},
                // {tagName: 'HH', tagDesc: 'This is HH description', priority: 31},
                {tagName: 'II', tagDesc: 'This is II description', priority: 31}
            ],
            alarmItems: [],
            currentSelected: null,
            filterData: [
                {
                    name: 'PLC',
                    filterKey: 'catalog',
                    filterValue: 'PLC',
                    icon: 'ContentInbox',
                    subItems: []
                },
                {
                    name: '优先级',
                    filterKey: '',
                    filterValue: '',
                    icon: 'ActionGrade',
                    subItems: [
                        {name: '优先级0', filterKey: 'priority', filterValue: '0', icon: 'ActionGrade', subItems: []},
                        {name: '优先级31', filterKey: 'priority', filterValue: '31', icon: 'ActionGrade', subItems: []}
                    ]}
            ],
            flattenFilters: []
        }
    }

    componentWillMount () {
        this.setState({
            alarmItems: this.state.currentShowItems
        });
    }

    onAlarmItemSelected (selectedRows) {
        if (selectedRows === 'undefined' || selectedRows.length <= 0) {
            return;
        }
        console.log('selected: ' + selectedRows);
        let [lastItem, ...middleItems] = [...selectedRows].reverse();
        this.setState({
            currentSelected: this.state.currentShowItems[lastItem]
        }, () => { console.log(this.state.currentSelected); });
    }

    filterFlatten (filterItems) {
        for (var index = 0; index < filterItems.length; index++) {
            var element = filterItems[index];
            if (element.filterKey !== '') {
                this.state.flattenFilters.push(
                    {
                        filterKey: element.filterKey,
                        filterValue: element.filterValue
                    });
            }

            let subLen = element.subItems.length !== 0;
            while (subLen) {
                this.filterFlatten(element.subItems);
                subLen = false;
            }
        }
    }

    onAlarmFilter (currentFilterIndex) {
        // 在界面显示的时候，是按照顺序往下递增，而filterData只计算第一层的item数，且filterData会递归
        // 因此需要那一个一维的数组保存所有的filter数据，也就是所谓的Array Flatten

        if (this.state.flattenFilters.length === 0) {
            this.filterFlatten(this.state.filterData);
        }

            // 保存原始的所有数据

        if (currentFilterIndex >= 0 && currentFilterIndex <= this.state.filterData.length) {
            let currentFilter = this.state.flattenFilters[currentFilterIndex];
            let newAlarmItems = this.state.alarmItems.filter((alarm) => {
                if (currentFilter.filterKey === 'priority') {
                    return currentFilter.filterValue == alarm.priority;
                }
            });

            if (newAlarmItems.length !== 0) {
                this.setState({
                    currentShowItems: newAlarmItems
                });
            } else {
                this.setState({
                    currentShowItems: this.state.alarmItems
                });
            }
        }
    }

    render () {
        return (
            <MuiThemeProvider muiTheme={muiTheme} >
                <div style={styles.container}>
                    <ControlHeader />
                    <FilterTree filterData={this.state.filterData} onFilter={this.onAlarmFilter.bind(this)}/>
                    <div style={styles.alarmContent}>
                        <AlarmList alarmItems={this.state.currentShowItems} onSelectedRows={this.onAlarmItemSelected.bind(this)}/>
                         <Divider />
                        <AlarmEntryInfo currentSelected={this.state.currentSelected}/>
                    </div>

                </div>
            </MuiThemeProvider>
        )
    }
}

export default RealtimeAlarm;
