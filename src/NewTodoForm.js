import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import './NewTodoForm.css';

const NewTodoForm = ({ add }) => {
	const INITIAL_STATE = {
		task : ''
	};
	const [ formData, setFormData ] = useState(INITIAL_STATE);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((formData) => ({
			...formData,
			[name] : value
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		add({ ...formData, id: uuid() });
		setFormData(INITIAL_STATE);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="task">New Task</label>
					<input
						id="task"
						type="text"
						name="task"
						placeholder="Task"
						value={formData.task}
						onChange={handleChange}
					/>
				</div>
				<button className="NewTodoForm-btn">Add Task</button>
			</form>
		</div>
	);
};

export default NewTodoForm;
