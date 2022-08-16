import React, {useState} from 'react';

const CreateTask = ({todoList, setTodoList}) => {
    const [valueInput, setValueInput] = useState('')        //State для инпута новой заметки

    const addTask = () => {                                          //Функция создания новой заметки
        if(valueInput){
            const newTaskItem = {
                id: Math.random()*1000,
                task: valueInput,
                status: 'waiting' // waiting, in-process, completed
            }
            setTodoList([...todoList, newTaskItem])     //Добавление только что созданной заметки в массив
        }
        setValueInput('')                         //Очистка инпута
    }

    const pressEnter = (e) => {                                     //Если после ввода названия заметки был нажат ENTER,
        if (e.key === "Enter"){                                     //тогда также вызывается addTask
            addTask()
        }
    }

    return (
        <div className="block-task-input">
            <div className="bti-title">
                Новая заметка:
            </div>
            <input
                type="text"
                placeholder="Введите название..."
                value={valueInput}
                onChange={e => setValueInput(e.target.value)}
                onKeyDown={pressEnter}
            />
            <div className="btn" onClick={addTask}>
                Добавить
            </div>
        </div>
    );
};

export default CreateTask;