import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Todo from './Todo';

// smoke test
it('renders without crashing', () => {
	render(<Todo />);
});

// snapshot test
it('matches snapshot', () => {
	const { asFragment } = render(<Todo />);
	expect(asFragment).toMatchSnapshot();
});

// editing snapshot test
it('matches editing snapshot', () => {
	const { asFragment, getByText } = render(<Todo />);
	const editBtn = getByText('Edit Task');
	fireEvent.click(editBtn);
	expect(asFragment).toMatchSnapshot();
});

it('runs task update function when edit form is submitted', () => {
	const mockEditFunc = jest.fn();

	const { getByText } = render(<Todo update={mockEditFunc} />);
	// get edit button to click it
	const editBtn = getByText('Edit Task');
	fireEvent.click(editBtn);
	const updateBtn = getByText('Update');
	fireEvent.click(updateBtn);
	expect(mockEditFunc).toHaveBeenCalled();
});

it('runs task delete function when delete button is clicked', () => {
	const mockDeleteFunc = jest.fn();
	const { getByText } = render(<Todo remove={mockDeleteFunc} />);
	const deleteBtn = getByText('Delete Task');
	fireEvent.click(deleteBtn);
	expect(mockDeleteFunc).toHaveBeenCalled();
});
