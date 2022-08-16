import React, {useState} from 'react';

const EditTask = ({todoList, setTodoList, changedTodo, setChangedTodo}) => {
    const [newName, setNewName] = useState('')
    const statusName = {
        waiting: 'В ожидании',
        inProcess: 'В процессе',
        completed: 'Выполнено'
    }

    const deleteTask = () => {
        setTodoList([...todoList.filter(todo => todo.id !== changedTodo.id)])
        setChangedTodo(null)
    }

    const inProcessTask = () => {
        setTodoList([
            ...todoList.map(todo =>
                todo.id === changedTodo.id ? {...todo, status: 'inProcess'} : {...todo}
            )])
        changedTodo.status = 'inProcess'
    }

    const completedTask = () => {
        setTodoList([
            ...todoList.map(todo =>
                todo.id === changedTodo.id ? {...todo, status: 'completed'} : {...todo}
                )])
        changedTodo.status = 'completed'
    }

    const renameTask = () => {
        setTodoList([
            ...todoList.map(todo =>
                todo.id === changedTodo.id ? {...todo, task: newName} : {...todo}
            )])
        changedTodo.task = newName
        setNewName('')
    }

    return (
        <div className="edit-task">
            <div className="edit-task-title">
                Редактирование заметки
            </div>
            {!changedTodo ?
                <div className="select-task-title">
                    Выберите заметку
                </div>
                :
                <div className="edit-block">
                    <p>Заметка: {changedTodo.task}</p>
                    <p>Статус: {statusName[changedTodo.status]}</p>
                    <div className="rename">
                        <input
                            type="text"
                            placeholder="Введите новое название..."
                            value={newName}
                            onChange={e => setNewName(e.target.value)}
                        />
                        <div className="btn rename-btn" onClick={renameTask}>
                            Переименовать
                        </div>
                    </div>
                    <div className="change-status">
                        <div className="btn inProcess-btn" onClick={inProcessTask}>
                            Взять в работу
                        </div>
                        <div className="btn completed-btn" onClick={completedTask}>
                            Выполнено
                        </div>
                    </div>
                    <div className="btn delete-btn" onClick={deleteTask}>
                        Удалить заметку
                    </div>
                </div>
            }
        </div>
    )
};

export default EditTask;