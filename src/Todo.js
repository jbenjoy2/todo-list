import React, { useState } from 'react';
import './Todo.css';

const Todo = ({ task = 'new task', id = '1', remove, update }) => {
	const [ updatedTask, setUpdatedTask ] = useState(task);
	const [ editing, setEditing ] = useState(false);

	const toggleEdit = () => {
		setEditing((edit) => !edit);
	};

	const handleChange = (e) => {
		setUpdatedTask(e.target.value);
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		update(id, updatedTask);
		setEditing(false);
	};
	const handleRemove = () => remove(id);

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
		<div className="Todo-task">
			<li>{task}</li>
			<button onClick={toggleEdit}>Edit Task</button>
			<button onClick={handleRemove}>Delete Task</button>
		</div>
	);
};
export default Todo;
