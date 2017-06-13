import Event, { EventEmitter } from 'events';

class ListStore extends EventEmitter {
    constructor (props) {
        super(props);
        this.state = {
            items: []
        }
    }

    getAll () {
        return this.state.items;
    }

    addNewItemHandler (text) {
        this.state.items.push(text);
    }

    emitChange () {
        this.emit('change');
    }

    addChangeListener (callback) {
        this.on('change', callback);
    }

    removeChangeListener (callback) {
        this.removeListener('change', callback);
    }
}

let listStore = new ListStore();

// ListStore.propTypes = { items: [] };
// ListStore.defaultProps = { items: [] };

export default listStore;
