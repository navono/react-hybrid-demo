import React, { Component } from 'react';
import buttonActions from '../actions/ButtonActions';
import MyButton from './MyButton';
import listStore, { TestClass } from '../stores/ListStore'

class MyButtonController extends Component {
    constructor (props) {
        super(props);
        this.createNewItem = this.createNewItem.bind(this);
        this._onChange = this._onChange.bind(this);
        this.state = {
            items: listStore.getAll()
        }
    }

    componentDidMount () {
        listStore.addChangeListener(this._onChange);
        // this.state.listStore.addChangeListener(this._onChange);
    }

    componentWillUnmount () {
        listStore.removeChangeListener(this._onChange);
        // this.state.listStore.removeChangeListener(this._onChange);
    }

    // componentWillUpdate () {
    //     console.log('componentWillUpdate');
    // }

    // componentDidUpdate () {
    //     console.log('componentDidUpdate');
    // }

    _onChange () {
        this.setState({
            items: listStore.getAll()
        })
    }

    createNewItem (event) {
        // ButtonActions.addNewItem('new item');
        // this.state.btnActions.addNewItem('new item');
        buttonActions.addNewItem('new item');
    }

    render () {
        return <MyButton items={this.state.items}
                    onClick={this.createNewItem} />;
    }
}

// MyButtonController.propTypes = { items: React.PropTypes.array };
// MyButtonController.defaultProps = { items: this.state.listStore.getAll() };

export default MyButtonController;
