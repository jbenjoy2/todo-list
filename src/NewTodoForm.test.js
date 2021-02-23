import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NewTodoForm from './NewTodoForm';

// smoke test
it('renders without crashing', () => {
	render(<NewTodoForm />);
});

// snapshot test
it('matches snapshot', () => {
	const { asFragment } = render(<NewTodoForm />);
	expect(asFragment()).toMatchSnapshot();
});

it('should call add function on form submit', () => {
	const mockAddFunc = jest.fn();

	const { getByText } = render(<NewTodoForm add={mockAddFunc} />);
	// grab submit button and click it
	const addBtn = getByText('Add Task');
	fireEvent.click(addBtn);

	// that add function should be called by submit handler
	expect(mockAddFunc).toHaveBeenCalled();
});
