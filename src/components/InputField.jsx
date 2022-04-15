import React from 'react';

const InputField = (props) => {
    const { text, setText, addTodo } = props
    return (
        <label>
            <input value={text} onChange={(e) => setText(e.target.value)}/>
            <button onClick={addTodo}>Add Todos</button>
        </label>
    )
}

export { InputField }
