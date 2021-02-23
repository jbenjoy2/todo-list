import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

// smoke test
it('renders without crashing', () => {
	render(<TodoList />);
});

// snapshot test
it('matches snapshot', () => {
	const { asFragment } = render(<TodoList />);
	expect(asFragment()).toMatchSnapshot();
});

it('should accept input and add new task', () => {
	const todoList = render(<TodoList />);

	// get input field and submit button
	const taskInput = todoList.getByLabelText('New Task');
	const taskBtn = todoList.getByText('Add Task');
	// no task should be rendered on page yet so expect no delete button or edit button
	expect(todoList.queryByText('Edit Task')).not.toBeInTheDocument();
	expect(todoList.queryByText('Delete Task')).not.toBeInTheDocument();
	// add task in input and submit it
	fireEvent.change(taskInput, { target: { value: 'test task' } });
	fireEvent.click(taskBtn);
	// both buttons should now be in the dom, along with a new task
	expect(todoList.queryByText('Edit Task')).toBeInTheDocument();
	expect(todoList.queryByText('Delete Task')).toBeInTheDocument();
	expect(todoList.getByText('test task')).toBeInTheDocument();

	// form input should be cleared after submit as well
	expect(taskInput).toHaveValue('');
});

it('can edit a task', () => {
	const todoList = render(<TodoList />);

	// get input field and submit button
	const taskInput = todoList.getByLabelText('New Task');
	const taskBtn = todoList.getByText('Add Task');
	// add task in input and submit it
	fireEvent.change(taskInput, { target: { value: 'test task' } });
	fireEvent.click(taskBtn);
	// grab the edit button and then click it
	const editButton = todoList.getByText('Edit Task');
	fireEvent.click(editButton);
	// grab the input that should have the value of "test task" and then change it to "update task"
	const editInput = todoList.getByDisplayValue('test task');
	fireEvent.change(editInput, { target: { value: 'update task' } });
	// submit the change by clicking "update" button
	fireEvent.click(todoList.getByText('Update'));
	// only the new value should show in document
	expect(todoList.getByText('update task')).toBeInTheDocument();
	expect(todoList.queryByText('test task')).not.toBeInTheDocument();
});

it('can delete a task', () => {
	const todoList = render(<TodoList />);

	// get input field and submit button
	const taskInput = todoList.getByLabelText('New Task');
	const taskBtn = todoList.getByText('Add Task');
	// add task in input and submit it
	fireEvent.change(taskInput, { target: { value: 'test task' } });
	fireEvent.click(taskBtn);
	// grab the delete button and then click it
	const deleteButton = todoList.getByText('Delete Task');
	fireEvent.click(deleteButton);
	// test task should no longer be in the document
	expect(todoList.queryByText('test task')).not.toBeInTheDocument();
});
