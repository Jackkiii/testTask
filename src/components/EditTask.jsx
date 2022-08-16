import React, {useState} from 'react';

const EditTask = ({todoList, setTodoList, changedTodo, setChangedTodo}) => {
    const [newName, setNewName] = useState('')  //State для изменения названия заметки

    const statusName = {            //Перевод статусов для отображения в окне редактирования
        waiting: 'В ожидании',
        inProcess: 'В процессе',
        completed: 'Выполнено'
    }

    const deleteTask = () => {                                                //Функция удаления заметки
        setTodoList([...todoList.filter(todo => todo.id !== changedTodo.id)]) //Возвращает массив со всеми объектами, у
        setChangedTodo(null)                                                  //которых id не совпало с выбранным, тем
    }                                                                         //самым, выбранная заметка не попадет в
                                                                              //новый массив

    const inProcessTask = () => {   //Функция измения статуса на "В процессе"
        setTodoList([               //При нажатие на кнопку "Взять в работу" в массиве todoList у объекта с выбранным id
            ...todoList.map(todo => //поле status заменяется на новое значение "inProcess"
                todo.id === changedTodo.id ? {...todo, status: 'inProcess'} : {...todo}
            )])
        changedTodo.status = 'inProcess'
    }

    const completedTask = () => {   //Функция измения статуса на "Выполнена"
        setTodoList([               //При нажатие на кнопку "Выполнено" в массиве todoList у объекта с выбранным id поле
            ...todoList.map(todo => //status заменяется на новое значение "completed"
                todo.id === changedTodo.id ? {...todo, status: 'completed'} : {...todo}
                )])
        changedTodo.status = 'completed'
    }

    const renameTask = () => {     //Функция изменения названия заметки
        if (newName) {             //В массиве todoList у объекта с выбранным id поле task заменяется на новое значение,
            setTodoList([          //которое было введено в соответствующий инпут
                ...todoList.map(todo =>
                    todo.id === changedTodo.id ? {...todo, task: newName} : {...todo}
                )])
            changedTodo.task = newName
            setNewName('')
        }
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