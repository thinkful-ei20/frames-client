import React from 'react';
import {shallow} from 'enzyme';

import {EditEmployeeForm} from '../components/forms/edit-employee-form';
import {clearEmployeeError} from '../actions/employee';

const mockDeleteEmployee = {
	type: 'DELETE_EMPLOYEE'
};

const mockUpdateEmployee = {
	type: 'UPDATE_EMPLOYEE'
};

jest.mock('../actions/employee', () => Object.assign({},
	require.requireActual('../actions/employee'),
	{
		deleteEmployee: jest.fn().mockImplementation(() => {
			return mockDeleteEmployee;
		}),
		updateEmployee: jest.fn().mockImplementation(() => {
			return mockUpdateEmployee;
		})
	}
));

describe('<EditEmployeeForm/>', () => {
	let wrapper;
	let dispatch;

	const props = {
		id: '000testid000',
		error: null,
		employee:{}
	};

	it('should render without crashing', () => {
		dispatch = jest.fn();
		shallow(<EditEmployeeForm dispatch={dispatch} {...props}/>);
	});

	it('should contain the correct input fields and buttons', () => {
		dispatch = jest.fn();
		wrapper = shallow(<EditEmployeeForm dispatch={dispatch} {...props}/>);

		expect(wrapper.find('input #firstname')).toHaveLength(1);
		expect(wrapper.find('input #lastname')).toHaveLength(1);
		expect(wrapper.find('input #email')).toHaveLength(1);
		expect(wrapper.find('input #phoneNumber')).toHaveLength(1);
		expect(wrapper.find('input #password')).toHaveLength(1);
		expect(wrapper.find('.form-delete-btn')).toHaveLength(1);
		expect(wrapper.find('.form-submit-btn')).toHaveLength(1);
		expect(wrapper.find('.form-reset-btn')).toHaveLength(1);
	});

	it('should dispatch updateEmployee() on submit', () => {
		dispatch = jest.fn();
		wrapper = shallow(<EditEmployeeForm dispatch={dispatch} {...props}/>);

		const preventDefault = jest.fn();

		wrapper.find('form').simulate('submit', {preventDefault});
		expect(preventDefault).toHaveBeenCalled();
		expect(dispatch).toHaveBeenCalledWith(mockUpdateEmployee);
	});

	it('should dispatch clearEmployeeError() on click reset', () => {
		dispatch = jest.fn();
		wrapper = shallow(<EditEmployeeForm dispatch={dispatch} {...props}/>);

		wrapper.find('.form-reset-btn').simulate('click');
		expect(dispatch).toHaveBeenCalledWith(clearEmployeeError());
	});

	it('should dispatch deleteEmployee() on click delete', () => {
		dispatch = jest.fn();
		wrapper = shallow(<EditEmployeeForm dispatch={dispatch} {...props}/>);

		wrapper.find('.form-delete-btn').simulate('click');
		expect(dispatch).toHaveBeenCalledWith(mockDeleteEmployee);
	});
});