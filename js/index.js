const reducer = Redux.combineReducers({
    todos: (state = [], action) => {
        const newState = Object.assign([], state);

        if(action.type === 'add') {
            newState.push(action.item);
        } else if(action.type === 'delete') {
            newState.splice(action.index, 1);
        }

        return newState;
    }
});

const store = Redux.createStore(reducer);

const render = () => {
    const container = document.getElementById('container');
    const state = store.getState();

    container.innerHTML = '';

    state.todos.forEach((todo, i) => {
        const e = document.createElement('div');
        
        e.className = 'todo';
        e.innerHTML = todo;
        container.appendChild(e);

        e.onclick = () => {
            store.dispatch({
                type: 'delete',
                index: i
            });

            render();
        }
    });
}

document.getElementById('addBtn').onclick = () => {
    store.dispatch({
        type: 'add',
        item: document.getElementById('todo').value
    });
    
    render();
}

render();
