import React, { useState } from 'react';
import './Todo.css';

const Todo = ({ task = 'new task', id = '1', remove, update }) => {
	const [ updatedTask, setUpdatedTask ] = useState(task);
	const [ editing, setEditing ] = useState(false);
	const [ completed, setCompleted ] = useState(false);
	const [ deleted, setDeleted ] = useState(false);

	const toggleEdit = () => {
		setEditing((edit) => !edit);
	};

	const toggleComplete = () => {
		setCompleted((completed) => !completed);
	};

	const markDeleted = () => {
		setDeleted(true);
	};

	const handleChange = (e) => {
		setUpdatedTask(e.target.value);
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		update(id, updatedTask);
		setEditing(false);
	};
	const handleRemove = () => {
		markDeleted();
		setTimeout(() => {
			remove(id);
		}, 500);
	};

	if (editing) {
		return (
			<div className="Todo-form">
				<form onSubmit={handleUpdate}>
					<input type="text" value={updatedTask} onChange={handleChange} autoFocus={true} />
					<button>Update</button>
				</form>
			</div>
		);
	}
	return (
		<div className={deleted ? 'Todo-hidden' : 'Todo-task'}>
			<li className={completed ? 'Todo-completed' : 'Todo'}>{task}</li>
			<div className="Todo-buttons">
				<button className="Todo-btn" onClick={toggleEdit}>
					Edit Task
				</button>
				<button className="Todo-btn" onClick={handleRemove}>
					Delete Task
				</button>
				<button className="Todo-btn" onClick={toggleComplete}>
					{completed ? 'Mark As Incomplete' : 'Mark As Completed'}{' '}
				</button>
			</div>
		</div>
	);
};
export default Todo;
