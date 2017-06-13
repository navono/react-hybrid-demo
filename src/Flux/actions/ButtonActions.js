import AppDispatcher from '../dispatcher/AppDispatcher';

class ButtonActions {
    constructor (props) {
    }

    addNewItem (text) {
        AppDispatcher.dispatch({
            actionType: 'ADD_NEW_ITEM',
            text: text
        });
    }
}

let buttonActions = new ButtonActions();

export default buttonActions;
