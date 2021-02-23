import React, { useState } from 'react';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';
import './TodoList.css';

const TodoList = () => {
	const [ todos, setTodos ] = useState([]);

	const createTodo = (todo) => {
		setTodos((todos) => [ ...todos, todo ]);
	};

	const editTodo = (id, taskEdit) => {
		setTodos((todos) => todos.map((todo) => (todo.id === id ? { ...todo, task: taskEdit } : todo)));
	};

	const removeTodo = (id) => {
		setTodos((todos) => todos.filter((todo) => todo.id !== id));
	};

	return (
		<div>
			<div className="TodoList-form">
				<h2>Add a task</h2>
				<NewTodoForm add={createTodo} />
			</div>
			<hr />
			<ul className="TodoList">
				{todos.map(({ id, task }) => (
					<Todo id={id} key={id} task={task} update={editTodo} remove={removeTodo} />
				))}
			</ul>
		</div>
	);
};

export default TodoList;
