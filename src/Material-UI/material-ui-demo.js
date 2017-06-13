/*
 * @Author: Ping Qixing
 * @Date: 2017-06-13 11:24:21
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-06-13 18:23:40
 *
 * @Description
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, { Component } from 'react';
import { RaisedButton, Dialog, FlatButton } from 'material-ui';
import { colors, getMuiTheme, MuiThemeProvider } from 'material-ui/styles';
// import { ContentInbox, ActionGrade } from 'material-ui/svg-icons'

const styles = {
    container: {
        textAlign: 'center',
        paddingTop: 100
    }
};

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: colors.deepOrange500
    }
});

class MaterialMain extends Component {
    constructor (props, context) {
        super(props, context);
        this.state = {
            open: false
        };
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);
    }

    handleRequestClose () {
        this.setState({
            open: false
        });
    }

    handleTouchTap () {
        this.setState({
            open: true
        })
    }

    render () {
        const standardActions = (
            <FlatButton
                label='OK'
                primary={true}
                onTouchTap={this.handleRequestClose}
            />);

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.container}>
                    <Dialog
                        open={this.state.open}
                        title="Super"
                        actions={standardActions}
                        onRequestClose={this.handleRequestClose}
                    >Man!</Dialog>
                    <h1>Meterial-UI</h1>
                    <h2>example page</h2>
                    <RaisedButton
                        label='Super'
                        secondary={true}
                        onTouchTap={this.handleTouchTap}
                    />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default MaterialMain;
