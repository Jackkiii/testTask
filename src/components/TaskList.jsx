import React, {useEffect, useRef} from 'react';
import TodoItem from "./TodoItem";

const TaskList = ({todoList, setChangedTodo, filteredTodo}) => {
    const ref = useRef(null)
    const refRight = useRef(null)

    const toggleTodo = (id) => {
        setChangedTodo(todoList.find(todo => todo.id === id))
    }

    useEffect(() =>{
      const resizeableEl = ref.current
      const style = window.getComputedStyle(resizeableEl)
      let width = parseInt(style.width, 10)
      let x = 0

      const onMouseMoveRightResize = (e) => {
          const dx = e.clientX - x
          x = e.clientX
          width = width + dx
          resizeableEl.style.width = `${width}px`
      }

      const onMouseUpRightResize = (e) => {
          document.removeEventListener("mousemove", onMouseMoveRightResize)
      }

      const onMouseDownRightResize = (e) => {
          x = e.clientX
          resizeableEl.style.userSelect = 'none'
          document.addEventListener("mousemove", onMouseMoveRightResize)
          document.addEventListener("mouseup", onMouseUpRightResize)
      }

      const resizerRight = refRight.current
      resizerRight.addEventListener("mousedown", onMouseDownRightResize)

      return () => {
          resizerRight.removeEventListener("mousedown",onMouseDownRightResize)
      }
    }, [])

    return (
        <div ref={ref} className="todo-list">
            <div ref={refRight} className="resizer"/>
            <div className="todo-list-title">
                Список заметок
            </div>
            <ol>
                {filteredTodo ?
                    filteredTodo.map(todoListItem => {
                        return (
                            <TodoItem
                                toggleTodo={toggleTodo}
                                todoListItem={todoListItem}
                                key={todoListItem.id}
                            />)
                    })
                    :
                    todoList.map(todoListItem => {
                        return (
                            <TodoItem
                                toggleTodo={toggleTodo}
                                todoListItem={todoListItem}
                                key={todoListItem.id}
                            />)
                    })
                }
            </ol>
        </div>
    );
};

export default TaskList;