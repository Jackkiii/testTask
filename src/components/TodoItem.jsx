import React from 'react';

const TodoItem = ({todoListItem, toggleTodo}) => {
    let status

    if(todoListItem.status === 'waiting') {
        status = ''
    }
    if(todoListItem.status === 'inProcess') {
        status = 'inProcess'
    }
    if(todoListItem.status === 'completed') {
        status = 'completed'
    }

    return (
        <li className={`todo-item ${status}`} key={todoListItem.id} onClick={() => toggleTodo(todoListItem.id)}>
            {todoListItem.task}
        </li>
    );
};

export default TodoItem;