/*
 * @Author: Ping Qixing
 * @Date: 2017-06-13 13:29:01
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-06-26 16:48:57
 *
 * @Description
 * real time alarm control
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  RaisedButton,
  IconButton,
  IconMenu,
  MenuItem,
  Dialog,
  FlatButton,
  List,
  ListItem,
  makeSelectable,
  Subheader,
  Divider,
  Paper,
  FontIcon,
  Checkbox
} from 'material-ui';
import { ContentInbox, ActionGrade } from 'material-ui/svg-icons';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import { colors, getMuiTheme, MuiThemeProvider, darkBaseTheme, lightBaseTheme } from 'material-ui/styles';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter
} from 'material-ui/Table';
import SvgIcon from 'material-ui/SvgIcon';

import {red500, green500} from 'material-ui/styles/colors'

import 'react-table/react-table.css';
import ReactTable from 'react-table';
// import CodeHighlight from '../utils/codeHighlight'

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
        // 'border': '1px solid green',
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
  },
  alarmListRowStyle: {
    paddingTop: '3px',
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

const FilterType = {
  priority: Symbol('priority'),
  device: Symbol('device')
}

const IconBtnDone = ({props, disabled, onClick}) => (
    <IconButton tooltip='Ack' disabled={disabled}>
        <SvgIcon {...props} onClick={onClick}>
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
        </SvgIcon>
    </IconButton>
)

const IconBtnNext = ({props, disabled, onClick}) => (
    <IconButton disabled={disabled}>
        <SvgIcon {...props} onClick={onClick}>
            <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
        </SvgIcon>
    </IconButton>
)

const IconBtnPrevious = ({props, disabled, onClick}) => (
    <IconButton disabled={disabled}>
        <SvgIcon {...props} onClick={onClick}>
            <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" />
        </SvgIcon>
    </IconButton>
)

const IconStart = ({props, color}) => (
  <SvgIcon {...props} style={{width: '20', height: '20', margin: '0'}} color={color}>
      <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
  </SvgIcon>
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
      this.handleRequestChange = this.handleRequestChange.bind(this);
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
                    onChange={this.handleRequestChange}>
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
    this.onSelectChanged = this.onSelectChanged.bind(this);
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
            items.push(<ListItem key={index.toString()} value={this.state.valueIndex}
                            primaryText={element.name} leftIcon={<ContentInbox/>}
                            primaryTogglesNestedList={true}
                            nestedItems={nestedItem}/>);
          } else {
            items.push(<ListItem key={index.toString()} value={this.state.valueIndex}
                            primaryText={element.name} leftIcon={<ContentInbox/>}
                            nestedItems={nestedItem}/>);
            this.state.valueIndex++;
          }
        } else if (element.icon === 'ActionGrade') {
          if (element.subItems.length !== 0) {
            items.push(<ListItem key={index.toString()} value={this.state.valueIndex}
                            primaryText={element.name} leftIcon={<ActionGrade/>}
                            primaryTogglesNestedList={true}
                            nestedItems={nestedItem}/>);
          } else {
            items.push(<ListItem key={index.toString()} value={this.state.valueIndex}
                            primaryText={element.name} leftIcon={<ActionGrade/>}
                            nestedItems={nestedItem}/>);
            this.state.valueIndex++;
          }
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
                        <SelectableList onChanged={this.onSelectChanged}>
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

    this.onPrint = this.onPrint.bind(this);
    this.onPrintDlgClose = this.onPrintDlgClose.bind(this);
    this.onAck = this.onAck.bind(this);
    this.onAckAll = this.onAckAll.bind(this);
    this.onFreeze = this.onFreeze.bind(this);
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
    this.props.onAckAlarms(false);
  }

  onAckAll () {
    this.props.onAckAlarms(true);
  }

  onFreeze () {
  }

  render () {
    const standardActions = [
      <FlatButton label='OK' primary={true} onTouchTap={this.onPrintDlgClose}/>,
      <FlatButton label='CANCEL' primary={true} keyboardFocused={true} onTouchTap={this.onPrintDlgClose}/>
    ];

    return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.noPaddingMargin}>
                    <Dialog title="打印" modal={false} actions={standardActions}
                        open={this.state.alarmPrint}
                        onRequestClose={this.onPrintDlgClose}>准备打印报警！</Dialog>

                    <IconBtnDone disabled={false} onClick={this.onAck}/>
                    <RaisedButton label='确认所有' style={buttonStyle} primary={true} onTouchTap={this.onAckAll}/>
                    <RaisedButton label='冻结' style={buttonStyle} primary={true} onTouchTap={this.onFreeze}/>
                    <RaisedButton label='消音' style={buttonStyle} secondary={true} onTouchTap={this.onPrint}/>
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
      selected: []
    };

    this.onRowHover = this.onRowHover.bind(this);
    this.onRowHoverExit = this.onRowHoverExit.bind(this);
    this.onPreviousPage = this.onPreviousPage.bind(this);
    this.onNextPage = this.onNextPage.bind(this);
    this.onAckAlarms = this.onAckAlarms.bind(this);
  }

  isSelected (index) {
    return this.state.selected.indexOf(index) !== -1;
  }

  handleRowSelection (rows) {
    this.setState({
      selected: rows
    });

    this.props.onSelectedRows(rows);
  }

  updateOperationButtonVisibility (row, visibility) {
    let clasName = 'row' + row;
    let domRow = document.getElementsByClassName(clasName);
    let btn = domRow[0].getElementsByClassName('op');
    btn[0].style.visibility = visibility;
  }

  onRowHover (rowNumber) {
    this.updateOperationButtonVisibility(rowNumber, 'visible');
  }

  onRowHoverExit (rowNumber) {
    this.updateOperationButtonVisibility(rowNumber, 'hidden');
  }

  onPreviousPage () {
    console.log('onPreviousPage');
  }

  onNextPage () {
    console.log('onNextPage');
  }

  onAckAlarms (ackAll) {
    this.props.onUpdateAlarms(ackAll);
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
        // console.log('AlarmList selectedRows: ' + this.props.selectedRows);
    return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <AlarmOperation alarmItems={this.props.alarmItems}
                                    selectedRows={this.props.selectedRows} onAckAlarms={this.onAckAlarms}/>
                    <Table multiSelectable={true} height={'200'}
                        onRowSelection={this.handleRowSelection}
                        onRowHover={this.onRowHover}
                        onRowHoverExit={this.onRowHoverExit}>
                        <TableHeader>
                          <TableRow>
                              <TableHeaderColumn>Name</TableHeaderColumn>
                              <TableHeaderColumn>Desc</TableHeaderColumn>
                          </TableRow>
                        </TableHeader>
                        <TableBody showRowHover={true} displayRowCheckbox={false}>
                            {this.props.alarmItems.map((row, index) => {
                              let refName = 'row' + index;
                              if (row.acked === false) {
                                return (
                                        <TableRow key={index} selected={this.isSelected(index)} className={refName}>
                                            <TableRowColumn style={{width: 10, visibility: 'hidden'}} >Ack</TableRowColumn>
                                            <TableRowColumn style={rowStyles.name}>{row.tagName}</TableRowColumn>
                                            <TableRowColumn style={rowStyles.alarmType}>{row.almType}</TableRowColumn>
                                            <TableRowColumn style={rowStyles.creatationTime}>{row.creationTime}</TableRowColumn>
                                            <TableRowColumn>{row.tagDesc}</TableRowColumn>
                                            <TableRowColumn className='op' style={{visibility: 'hidden'}}>
                                                 <IconMenu iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
                                                        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                                        targetOrigin={{horizontal: 'left', vertical: 'top'}}>
                                                    <MenuItem primaryText='操作A' />
                                                    <MenuItem primaryText='操作B' />
                                                </IconMenu>
                                            </TableRowColumn>
                                        </TableRow>);
                              } else {
                                return (
                                <TableRow key={index} selected={this.isSelected(index)} className={refName}>
                                            <TableRowColumn style={{width: 10}}>Ack</TableRowColumn>
                                            <TableRowColumn style={rowStyles.name}>{row.tagName}</TableRowColumn>
                                            <TableRowColumn style={rowStyles.alarmType}>{row.almType}</TableRowColumn>
                                            <TableRowColumn style={rowStyles.creatationTime}>{row.creationTime}</TableRowColumn>
                                            <TableRowColumn>{row.tagDesc}</TableRowColumn>
                                            <TableRowColumn className='op' style={{visibility: 'hidden'}}>
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
                                    <IconBtnPrevious disabled={true} onClick={this.onPreviousPage} />
                                    <IconBtnNext disabled={false} onClick={this.onNextPage.bind}/>
                                </TableRowColumn >
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </MuiThemeProvider>
    )
  }
}

class AlarmListV2 extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      columnTitle: [
        {Header: '', accessor: 'selected', width: 50, filterable: false, sortable: false, 
          Cell: (row) => (
            <div>
              <Checkbox checked={row.value} />
            </div>
          )
        },
        {Header: '状态', accessor: 'acked', width: 90, 
          Cell: (row) => {
            return (
            <div>
              <div style={{float: 'left', margin: '0 10px 0 0'}}>
                <IconStart color={row.value === true? green500 : red500} />
              </div>
              <div style={styles.alarmListRowStyle} className="alarmRow">
                {row.value === true? '已确认' : '报警中'}
              </div>
            </div>
          )}
        },
        {Header: '位号名', accessor: 'tagName', width: 100, 
          filterMethod: (filter, row) => (row[filter.id].includes(filter.value)),
          Cell: (row) => (
            <div style={styles.alarmListRowStyle} className="alarmRow">
              {row.value}
            </div>
          )
        },
        {Header: '报警类型', accessor: 'almType', width: 80,},
        {Header: '时间', accessor: 'creationTime', width: 150, 
          filterMethod: (filter, row) => (row[filter.id].includes(filter.value)),
          Cell: (row) => (
            <div style={styles.alarmListRowStyle}>
              {row.value}
            </div>
          )
        },
        {Header: '描述', accessor: 'tagDesc',
          Cell: (row) => (
            <div style={styles.alarmListRowStyle}>
              {row.value}
            </div>
          )
        },
        ],
    }
  }
  // defaultFilterMethod={(filter, row) => (String(row[filter.id]) === filter.value)}
  // defaultFilterMethod={(filter, row) => (row[filter.id].includes(filter.value))}

  handleRowClick (rowInfo) {
    this.props.onRowSelected(rowInfo.index);
  }

  componentWillReceiveProps (nextProps, nextState) {
    // console.log(`nextProps: ${nextProps}, nextState: ${nextState}`);
  }

  render() {
    return (
      <div className="table-wrap">
        <ReactTable
          data={this.props.items}
          columns={this.state.columnTitle}
          className='-striped -highlight'
          defaultPageSize={10}
          style={{
              height: '300px' // This will force the table body to overflow and scroll, since there is not enough room
            }}
          filterable={true}
          getTrProps={(state, rowInfo, column, instance) => {
            return {
              onClick: e => {
                return this.handleRowClick(rowInfo);
              }
            }
          }}
          />
      </div>
    )
  }
}

class AlarmEntryInfo extends Component {
  constructor (props, context) {
    super(props, context)
  }

  render () {
    let itemName, itemDesc, priority, dispose;
    if (this.props.lastSelectedRow) {
      itemName = this.props.lastSelectedRow.tagName;
      itemDesc = this.props.lastSelectedRow.tagDesc;
      priority = this.props.lastSelectedRow.priority;
      dispose = `需关闭设备 ${this.props.lastSelectedRow.device}，进行检修！`;
    } else {
      itemName = '';
      itemDesc = '';
      priority = '';
      dispose = '';
    }

    return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={{'margin': 10}}>
                    <p>报警名称：{itemName}</p>
                    <p>报警描述：{itemDesc}</p>
                    <p>报警优先级：{priority}</p>
                    <p>报警处置：{dispose}</p>
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
                {tagName: 'AA', creationTime: '2017/6/15 12:00:03', almType: 'H', tagDesc: 'This is AA description',
                 device: 'B', priority: 0, acked: true, selected: false},
                {tagName: 'BB', creationTime: '2017/6/15 12:01:14', almType: 'LL', tagDesc: 'This is BB description',
                 device: 'A', priority: 0, acked: false, selected: false},
                {tagName: 'CC', creationTime: '2017/6/15 12:05:23', almType: 'HH', tagDesc: 'This is CC description',
                 device: 'B', priority: 0, acked: false, selected: false},
                {tagName: 'DD', creationTime: '2017/6/15 12:10:35', almType: 'L', tagDesc: 'This is DD description',
                 device: 'A', priority: 0, acked: false, selected: false},
                {tagName: 'EE', creationTime: '2017/6/15 12:20:03', almType: 'HH', tagDesc: 'This is EE description',
                 device: 'B', priority: 31, acked: false, selected: false},
                {tagName: 'FF', creationTime: '2017/6/15 12:30:45', almType: 'LL', tagDesc: 'This is FF description',
                 device: 'A', priority: 31, acked: false, selected: false},
                {tagName: 'GG', creationTime: '2017/6/15 12:45:00', almType: 'H', tagDesc: 'This is GG description',
                 device: 'B', priority: 31, acked: false, selected: false},
                {tagName: 'HH', creationTime: '2017/6/15 13:03:03', almType: 'HH', tagDesc: 'This is HH description',
                 device: 'A', priority: 31, acked: false, selected: false},
                {tagName: 'II', creationTime: '2017/6/15 13:05:56', almType: 'L', tagDesc: 'This is II description',
                 device: 'B', priority: 31, acked: false, selected: false}
      ],
      alarmItems: [],
      lastSelectedRow: null,
      selectedRows: [],
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
                        {name: '优先级0', filterKey: FilterType.priority, filterValue: '0', icon: 'ActionGrade', subItems: []},
                        {name: '优先级31', filterKey: FilterType.priority, filterValue: '31', icon: 'ActionGrade', subItems: []}
          ]
        },
        {
          name: '设备',
          filterKey: '',
          filterValue: '',
          icon: 'ActionGrade',
          subItems: [
                        {name: '设备A', filterKey: FilterType.device, filterValue: 'A', icon: 'ActionGrade', subItems: []},
                        {name: '设备B', filterKey: FilterType.device, filterValue: 'B', icon: 'ActionGrade', subItems: []}
          ]
        }
      ],
      flattenFilters: []
    }

    this.onAlarmFilter = this.onAlarmFilter.bind(this);
    this.onAlarmItemSelected = this.onAlarmItemSelected.bind(this);
    this.onUpdateAlarms = this.onUpdateAlarms.bind(this);
    this.hanleRowSelected = this.hanleRowSelected.bind(this);
  }

  componentWillMount () {
    this.setState({
      alarmItems: this.state.currentShowItems
    });
  }

  onAlarmItemSelected (selectedAlarms) {
    if (selectedAlarms === 'undefined' || selectedAlarms.length <= 0) {
      return;
    }
    let [lastItem, ...middleItems] = [...selectedAlarms].reverse();
    this.setState({
      lastSelectedRow: this.state.currentShowItems[lastItem],
      selectedRows: selectedAlarms
    });
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
    if (currentFilterIndex >= 0 && currentFilterIndex <= this.state.flattenFilters.length) {
      let currentFilter = this.state.flattenFilters[currentFilterIndex];
      let newAlarmItems = this.state.alarmItems.filter((alarm) => {
        if (currentFilter.filterKey === FilterType.priority) {
          return currentFilter.filterValue == alarm.priority;
        } else if (currentFilter.filterKey === FilterType.device) {
          return currentFilter.filterValue == alarm.device;
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

  onUpdateAlarms (ackAll) {
    let newAlarms = this.state.currentShowItems;
    if (ackAll) {
      // console.log('Ack all alarm');
      this.state.currentShowItems.map((row, index) => {
        newAlarms[index].acked = true;
      });
    } else {
      // console.log('Ack alarm rows: ' + this.state.selectedRows);
      this.state.selectedRows.map((rowNumber, index) => {
        newAlarms[rowNumber].acked = true;
      });
    }

    this.setState({
      currentShowItems: newAlarms
    })
  }

  hanleRowSelected (rowIndex) {
    let newAlarmItems = this.state.currentShowItems;
    newAlarmItems[rowIndex].selected = !newAlarmItems[rowIndex].selected;
    // console.log(`set ${newAlarmItems[row].tagName} to ${newAlarmItems[row].selected}`);
    if (newAlarmItems[rowIndex].selected) {
      let rows = this.state.selectedRows;
      rows.push(rowIndex);
      this.setState({
          selectedRows: rows
        }
      )
    }

    this.setState({
      currentShowItems: newAlarmItems
    });
  }

  render () {
    return (
            <MuiThemeProvider muiTheme={muiTheme} >
                <div style={styles.container}>
                    <ControlHeader />
                    <FilterTree filterData={this.state.filterData} onFilter={this.onAlarmFilter}/>
                    <div style={styles.alarmContent}>
                        {/*<AlarmList
                          alarmItems={this.state.currentShowItems}
                          onSelectedRows={this.onAlarmItemSelected}
                          selectedRows={this.state.selectedRows}
                          onUpdateAlarms={this.onUpdateAlarms}/> */}
                        <AlarmOperation
                          alarmItems={this.state.currentShowItems}
                          selectedRows={this.state.selectedRows}
                          onAckAlarms={this.onUpdateAlarms}/>
                        <AlarmListV2 items={this.state.currentShowItems} onRowSelected={this.hanleRowSelected} />
                        <Divider />
                        <AlarmEntryInfo lastSelectedRow={this.state.lastSelectedRow}/>
                    </div>
                </div>
            </MuiThemeProvider>
    )
  }
}

export default RealtimeAlarm;
