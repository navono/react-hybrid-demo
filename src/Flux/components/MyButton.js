import React, { Component } from 'react';

/* class MyButton extends Component {
    constructor (props) {
        super(props);
        this.state = {
            itemList: this.props.items.map((listItem, i) => {
                console.log(listItem);
                return <li key={i}>{listItem}</li>;
            })
        }
    }

    render () {
        return <div>
            <ul>{this.state.itemList}</ul>
            <button onClick={this.props.onClick}>New Item</button>
        </div>
    }
} */
let MyButton = function (props) {
    let items = props.items;
    let itemHtml = items.map(function (listItem, i) {
        return <li key={i}>{listItem}</li>;
    });

    return <div>
        <ul>{itemHtml}</ul>
        <button onClick={props.onClick}>New Item</button>
  </div>;
};

export default MyButton;
