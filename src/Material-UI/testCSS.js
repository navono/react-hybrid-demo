/*
 * @Author: Ping Qixing
 * @Date: 2017-06-13 16:20:41
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-06-13 18:46:20
 *
 * @Description
 */
import React, { Component } from 'react';
import { RaisedButton, Dialog, FlatButton, List, ListItem, Subheader } from 'material-ui';
import { ContentInbox, ActionGrade } from 'material-ui/svg-icons';
import { colors, getMuiTheme, MuiThemeProvider, lightBaseTheme, darkBaseTheme } from 'material-ui/styles';

const styles = {
    container: {
        'width': '90%',
        'margin': '10px auto',
        'background-color': '#fff',
        'color': '#333',
        'border': '1px solid gray',
        'line-height': '130%'
    },
    top: {
        'padding': '.5em',
        'background-color': '#ddd',
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
        'background-color': '#ddd',
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

class TestPage extends Component {
    render () {
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
                    <h2 style={styles.h2}>Subheading</h2>
                    <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
                    </p>
                    <p>
                    Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                    </p>
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
