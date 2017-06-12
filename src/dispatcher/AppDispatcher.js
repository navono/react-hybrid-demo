import Flux, { Dispatcher } from 'flux';
import listStore from '../stores/ListStore';

const AppDispatcher = new Dispatcher();
AppDispatcher.register(action => {
    switch (action.actionType) {
        case 'ADD_NEW_ITEM':
            // ListStore.addNewItemHandler(action.text);
            // ListStore.emitChange();
            listStore.addNewItemHandler(action.text);
            listStore.emitChange();
            break;

        default:
            break;
    }
})

export default AppDispatcher;
