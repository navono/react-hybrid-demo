/*
 * @Author: Ping Qixing
 * @Date: 2017-06-13 13:29:01
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-06-13 18:21:45
 *
 * @Description
 * real time alarm control
 */
import React, { Component } from 'react';
import { RaisedButton, Dialog, FlatButton, List, ListItem, Subheader, Divider } from 'material-ui';
import { ContentInbox, ActionGrade } from 'material-ui/svg-icons';
import { colors, getMuiTheme, MuiThemeProvider } from 'material-ui/styles';

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
        'padding': '1em',
        'max-width': '36em'
    }
};

const buttonStyle = {
    'margin': 12
}

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: colors.deepOrange500
    }
});

class RealtimeAlarm extends Component {
    constructor (props, context) {
        super(props, context);
    }

    render () {
        return (
            <MuiThemeProvider muiTheme={muiTheme} >
                <div style={styles.container}>
                    <div style={styles.header}>
                        <h1 style={{'padding': 0, 'margin': 0}}><b>Realtime Alarm Control</b></h1>
                    </div>
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

                    <div style={styles.alarmContent}>
                        <div>
                            <RaisedButton label='打印' style={buttonStyle} />
                        </div>
                        <h2 style={styles.h2}>Subheading</h2>
                        <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
                        </p>
                        <p>
                        Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                        </p>
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default RealtimeAlarm;
