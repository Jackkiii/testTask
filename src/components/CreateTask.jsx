import React, {useState} from 'react';

const CreateTask = ({todoList, setTodoList}) => {
    const [valueInput, setValueInput] = useState('')

    const addTask = () => {
        if(valueInput){
            const newTaskItem = {
                id: Math.random()*1000,
                task: valueInput,
                status: 'waiting' // waiting, in-process, completed
            }
            setTodoList([...todoList, newTaskItem])
        }
        setValueInput('')
    }

    const pressEnter = (e) => {
        if (e.key === "Enter"){
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
            <div className="btn-new-task" onClick={addTask}>
                Добавить
            </div>
        </div>
    );
};

export default CreateTask;