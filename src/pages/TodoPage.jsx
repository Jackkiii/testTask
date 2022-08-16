import React, {useState} from 'react';
import EditTask from "../components/EditTask";
import CreateTask from "../components/CreateTask";
import TaskList from "../components/TaskList";
import SearchTodo from "../components/SearchTodo";

const TodoPage = () => {
    const [todoList, setTodoList] = useState([])        //State для хранения заметок
    const [changedTodo, setChangedTodo] = useState(null)//State для выбора конкретной заметки в списке и для дальнейшей отрисовки EditTask
    const [searchInput, setSearchInput] = useState('')  //State для инпута поиска заметки по названию


    const filteredTodo = (todoList.filter(todoItem => {          //Функция для поиска заметки по названию
            return todoItem.task.toLowerCase().includes(searchInput.toLowerCase())
    }))

    return (
        <div className="TodoPage">
            <div className="add-and-search-inputs">
                <CreateTask todoList={todoList} setTodoList={setTodoList}/>
                <SearchTodo searchInput={searchInput} setSearchInput={setSearchInput}/>
            </div>
            <div className="content">
                <TaskList
                    todoList={todoList}
                    setChangedTodo={setChangedTodo}
                    filteredTodo={filteredTodo}
                />
                <EditTask
                    todoList={todoList}
                    setTodoList={setTodoList}
                    changedTodo={changedTodo}
                    setChangedTodo={setChangedTodo}
                />
            </div>
        </div>
    );
};

export default TodoPage;