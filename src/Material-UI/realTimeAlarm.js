/*
 * @Author: Ping Qixing
 * @Date: 2017-06-13 13:29:01
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-06-16 16:24:22
 *
 * @Description
 * real time alarm control
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { RaisedButton, IconButton, IconMenu, MenuItem, Dialog, FlatButton, List, ListItem, makeSelectable, Subheader, Divider, Paper, FontIcon } from 'material-ui';
import { ContentInbox, ActionGrade } from 'material-ui/svg-icons';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import { colors, getMuiTheme, MuiThemeProvider, darkBaseTheme, lightBaseTheme } from 'material-ui/styles';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table';
import SvgIcon from 'material-ui/SvgIcon';

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
        'maxHeight': '700',
        'lineHeight': '100%'
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
        'height': '410',
        'border': '1px solid green',
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

const IconDone = (props) => (
    <IconButton tooltip='Ack'>
        <SvgIcon {...props}>
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
        </SvgIcon>
    </IconButton>
)

const IconNext = ({props, diabled, onClick}) => (
    <IconButton disabled={diabled}>
        <SvgIcon {...props} onClick={onClick}>
            <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
        </SvgIcon>
    </IconButton>
)

const IconPrevious = ({props, diabled, onClick}) => (
    <IconButton disabled={diabled}>
        <SvgIcon {...props} onClick={onClick}>
            <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" />
        </SvgIcon>
    </IconButton>
)

class ControlHeader extends Component {
    constructor (props, context) {
        super(props, context);
    }

    render () {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.header}>
                    <p style={styles.noPaddingMargin}><b>Realtime Alarm Control</b></p>
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
                    {/* <SelectableList onChanged={this.onSelectChanged.bind(this)} style={{maxHeight: 200, overflow: 'auto'}}>
                        <Subheader style={styles.filterTreeSubHeader}>报警过滤</Subheader>
                        <Divider />
                        { this.state.items }
                    </SelectableList> */}
                    <div style={{overflow: 'auto', height: '100%'}}>
                        <SelectableList onChanged={this.onSelectChanged.bind(this)}>
                            { this.state.items }
                        </SelectableList>
                    </div>
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

                    <IconDone />
                    <RaisedButton label='确认所有' style={buttonStyle} primary={true} onTouchTap={this.onAckAll.bind(this)}/>
                    <RaisedButton label='冻结' style={buttonStyle} primary={true} onTouchTap={this.onFreeze.bind(this)}/>
                    <RaisedButton label='消音' style={buttonStyle} secondary={true} onTouchTap={this.onPrint.bind(this)}/>
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

        console.log(selectedRows);

        let r = ReactDOM.findDOMNode(this);

        console.log(r);

        console.log(this.refs['row1'].styles);
        let n = this.refs['row1'];

        this.props.onSelectedRows(selectedRows);
    }

    onRowHover (rowNumber) {
        console.log(rowNumber);
    }

    onPreviousPage () {
        console.log('onPreviousPage');
    }

    onNextPage () {
        console.log('onNextPage');
    }

    render () {
        const rowStyles = {
            name: {
                width: 30
            },
            alarmType: {
                width: 30
            },
            creatationTime: {
                width: 170
            },
            footer: {
                margin: '0 0 0.5em 0',
                textAlign: 'right',
                verticalAlign: 'middle'
            }
        }
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <AlarmOperation />
                    <Table onRowSelection={this.handleRowSelection} multiSelectable={true} height={'200'} onRowHover={this.onRowHover.bind(this)}>
                        <TableBody showRowHover={true} displayRowCheckbox={false}>
                            {this.props.alarmItems.map((row, index) => {
                                let refName = 'row' + index;

                                if (row.acked === false) {
                                    return (
                                        <TableRow key={index} selected={this.isSelected(index)}>
                                            <TableRowColumn style={{width: 10}} ></TableRowColumn>
                                            <TableRowColumn style={rowStyles.name}>{row.tagName}</TableRowColumn>
                                            <TableRowColumn style={rowStyles.alarmType}>{row.almType}</TableRowColumn>
                                            <TableRowColumn style={rowStyles.creatationTime}>{row.creationTime}</TableRowColumn>
                                            <TableRowColumn>{row.tagDesc}</TableRowColumn>
                                            <TableRowColumn />
                                        </TableRow>);
                                } else {
                                    return (
                                        <TableRow key={index} selected={this.isSelected(index)} ref={refName}>
                                            {/* <TableRowColumn ><IconDone/></TableRowColumn> */}
                                            <TableRowColumn style={{width: 10}}>Ack</TableRowColumn>
                                            <TableRowColumn style={rowStyles.name}>{row.tagName}</TableRowColumn>
                                            <TableRowColumn style={rowStyles.alarmType}>{row.almType}</TableRowColumn>
                                            <TableRowColumn style={rowStyles.creatationTime}>{row.creationTime}</TableRowColumn>
                                            <TableRowColumn>{row.tagDesc}</TableRowColumn>
                                            <TableRowColumn>
                                                <IconMenu iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
                                                        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                                        targetOrigin={{horizontal: 'left', vertical: 'top'}}>
                                                    <MenuItem primaryText='操作A' />
                                                    <MenuItem primaryText='操作B' />
                                                </IconMenu>
                                            </TableRowColumn>
                                        </TableRow>);
                                }
                            })}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableRowColumn colSpan='3' style={rowStyles.footer}>
                                    <b>共：{this.props.alarmItems.length} 条报警</b>
                                </TableRowColumn>
                                <TableRowColumn style={rowStyles.footer}>
                                    <IconPrevious diabled={true} onClick={this.onPreviousPage.bind(this)} />
                                    <IconNext diabled={false} onClick={this.onNextPage.bind(this)}/>
                                </TableRowColumn >
                            </TableRow>
                        </TableFooter>
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
                {tagName: 'AA', creationTime: '2017/6/15 12:00:03', almType: 'H', tagDesc: 'This is AA description', priority: 0, acked: false},
                {tagName: 'BB', creationTime: '2017/6/15 12:01:14', almType: 'LL', tagDesc: 'This is BB description', priority: 0, acked: true},
                {tagName: 'CC', creationTime: '2017/6/15 12:05:23', almType: 'HH', tagDesc: 'This is CC description', priority: 0, acked: false},
                {tagName: 'DD', creationTime: '2017/6/15 12:10:35', almType: 'L', tagDesc: 'This is DD description', priority: 0, acked: true},
                {tagName: 'EE', creationTime: '2017/6/15 12:20:03', almType: 'HH', tagDesc: 'This is EE description', priority: 31, acked: true},
                {tagName: 'FF', creationTime: '2017/6/15 12:30:45', almType: 'LL', tagDesc: 'This is FF description', priority: 31, acked: false},
                {tagName: 'GG', creationTime: '2017/6/15 12:45:00', almType: 'H', tagDesc: 'This is GG description', priority: 31, acked: true},
                {tagName: 'HH', creationTime: '2017/6/15 13:03:03', almType: 'HH', tagDesc: 'This is HH description', priority: 31, acked: false},
                {tagName: 'II', creationTime: '2017/6/15 13:05:56', almType: 'L', tagDesc: 'This is II description', priority: 31, acked: true}
            ],
            alarmItems: [],
            currentSelected: null,
            filterData: [
                {
                    name: '所有报警',
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
