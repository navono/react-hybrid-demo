/*
 * @Author: Ping Qixing
 * @Date: 2017-06-13 16:20:41
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-06-23 08:55:27
 *
 * @Description
 */
import React, { Component } from 'react';
import { RaisedButton, IconButton, Dialog, FlatButton, List, ListItem, Subheader } from 'material-ui';
import { ContentInbox, ActionGrade } from 'material-ui/svg-icons';
import { colors, getMuiTheme, MuiThemeProvider, lightBaseTheme, darkBaseTheme } from 'material-ui/styles';

import SvgIcon from 'material-ui/SvgIcon'
import 'react-table/react-table.css';
import ReactTable from 'react-table';

const styles = {
  container: {
    'width': '90%',
    'margin': '10px auto',
    'backgroundColor': '#fff',
    'color': '#333',
    'border': '1px solid gray',
    'line-height': '130%'
  },
  top: {
    'padding': '.5em',
    'backgroundColor': '#ddd',
    'border-bottom': '1px solid gray'
  },
  leftnav: {
    'float': 'left',
        // 'width': '160px',
    'width': '20%',
    'margin': 0
        // 'padding': '1em'
  },
  content: {
        // 'margin-left': '200px',
    'margin-left': '20%',
    'border-left': '1px solid gray',
    'padding': '1em',
    'max-width': '36em'
  },
  footer: {
    'clear': 'both',
    'margin': 0,
    'padding': '.5em',
    'color': '#333',
    'backgroundColor': '#ddd',
    'border-top': '1px solid gray'
  },
  h1: {
    'padding': 0,
    'margin': 0
  },
  h2: {
    'margin': '0 0 .5em 0'
  }
}

const AckDoneIcon = (props) => (
    <div>
        <IconButton tooltip='Ack'>
            <SvgIcon {...props}>
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />>
            </SvgIcon>
        </IconButton>
    </div>
)

const SvgIconExample = () => (
    <div>
        <AckDoneIcon />
    </div>
)

class TestPage extends Component {
  render () {
    const data = [{
      name: 'xxx',
      age: 22,
      friend: {
        name: 'uyyy',
        age: 23
      }
    }, {
      name: 'yyyy',
      age: 34,
      friend: {
        name: 'uyyy',
        age: 23
      }
    }]

    const columns = [{
      Header: 'Name',
      accessor: 'name' // String-based value accessors!
    }, {
      Header: 'Age',
      accessor: 'age',
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
      id: 'friendName', // Required because our accessor is not a string
      Header: 'Friend Name',
      accessor: d => d.friend.name // Custom value accessors!
    }, {
      Header: props => <span>Friend Age</span>, // Custom header components!
      accessor: 'friend.age'
    }]

    return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
            <div id="container" style={styles.container}>
                <div id="top" style={styles.top}>
                    <h1 style={styles.h1}>Header</h1>
                </div>

                <div id="leftnav" style={styles.leftnav}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut.
                    </p>
                     <List style={{'background': '#fff', 'width': '100%'}}>
                        <Subheader >报警过滤</Subheader>
                        <ListItem primaryText='PLC' leftIcon={<ContentInbox />} />
                        <ListItem primaryText='优先级' leftIcon={<ActionGrade />}
                            primaryTogglesNestedList={true}
                            nestedItems={[
                              <ListItem primaryText='优先级31' leftIcon={<ActionGrade />}/>
                            ]}
                        />
                    </List>
                </div>

                <div id="content" style={styles.content}>
                    <SvgIconExample />
                    <h2 style={styles.h2}>Subheading</h2>
                    <ReactTable data={data} columns={columns} />
                    {/* <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
                    </p>
                    <p>
                    Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                    </p> */}
                </div>

                <div id="footer" style={styles.footer}>
                    Footer
                </div>
            </div>
            </MuiThemeProvider>
    );
  }
}

export default TestPage;
