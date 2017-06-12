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

export class TestClass {
    // constructor (props) {
    //     this.state = {
    //         data: 'data from TestClass'
    //     }
    // }

    print () {
        console.log('print');
    }

    static print2 () {
        console.log('print2');
    }
}

export default listStore;
// export {ListStore, TestClass};
