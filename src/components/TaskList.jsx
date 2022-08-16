import React, {useEffect, useRef} from 'react';
import TodoItem from "./TodoItem";

const TaskList = ({todoList, setChangedTodo, filteredTodo}) => {
    const ref = useRef(null)
    const refRight = useRef(null)

    const toggleTodo = (id) => {                               //В переменную changedTodo помещается объект, на который
        setChangedTodo(todoList.find(todo => todo.id === id))  //нажали в списке заметок. Необходимо для отрисовки окна
    }                                                          //редактирования

    useEffect(() =>{                                     //Применяется для изменения ширины блока "Списка заметок"
        const resizeableEl = ref.current
        const style = window.getComputedStyle(resizeableEl)
        const maxWidth = parseInt(style.maxWidth, 10)
        const minWidth = parseInt(style.minWidth, 10)
        let width = parseInt(style.width, 10)

        const onMouseMoveRightResize = (e) => {     //Событие при передвижении вертикальной полоски. Изменяется ширина
            const dx = e.movementX
            width = width + dx
            resizeableEl.style.width = `${width}px`
        }

        const onMouseUpRightResize = (e) => {       //Событие, когда ЛКМ отпустили.
            document.removeEventListener("mousemove", onMouseMoveRightResize)
            if (width > maxWidth) width = maxWidth
            if (width < minWidth) width = minWidth
        }

        const onMouseDownRightResize = (e) => {     //Событие, когда на ЛКМ нажали.
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