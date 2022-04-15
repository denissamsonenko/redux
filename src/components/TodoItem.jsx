import React from "react";
import {useDispatch} from "react-redux";
import { deleteTodo, toggleStatus } from "../store/todoSlice";

const TodoItem = (props) => {
    const { id, title, completed } = props
    const dispatch = useDispatch();

    return (
        <li>
            <input type='checkbox' checked={completed}
                   onChange={() => dispatch(toggleStatus(id))}/>
            <span>{title}</span>
            <span style={{color: 'red'}} onClick={() => dispatch(deleteTodo(id))}>&times;</span>
        </li>
    )
}

export { TodoItem }
