import React from 'react';
import {shallow} from 'enzyme';

import {CreateEmployeeForm} from '../components/forms/create-employee-form';
import {hideModal} from '../actions/modals';

const mockCreateEmployee = {
	type: 'CREATE_EMPLOYEE'
};

jest.mock('../actions/employee', () => Object.assign({},
	require.requireActual('../actions/employee'),
	{
		createEmployee: jest.fn().mockImplementation(() => {
			return mockCreateEmployee;
		}),
	}
));

describe('Create Employee Form', () => {
	let wrapper;
	let dispatch = jest.fn();
	const props = {
		error:  null
	};
	it('should render without crashing', () => {
		dispatch = jest.fn();
		shallow(<CreateEmployeeForm dispatch={dispatch} {...props}/>);
	});


	it('should contain the correct input fields and buttons', () => {
		dispatch = jest.fn();
		wrapper = shallow(<CreateEmployeeForm dispatch={dispatch} {...props}/>);

		expect(wrapper.find('input #firstname')).toHaveLength(1);
		expect(wrapper.find('input #lastname')).toHaveLength(1);
		expect(wrapper.find('input #image')).toHaveLength(1);
		expect(wrapper.find('input #email')).toHaveLength(1);
		expect(wrapper.find('input #phoneNumber')).toHaveLength(1);
		expect(wrapper.find('input #password')).toHaveLength(1);
		expect(wrapper.find('.form-submit-btn')).toHaveLength(1);
		expect(wrapper.find('.form-reset-btn')).toHaveLength(1);
	});

	it('hould dispatch createEmployee() on submit', () => {
		dispatch = jest.fn();
		wrapper = shallow(<CreateEmployeeForm dispatch={dispatch} {...props}/>);

		const preventDefault = jest.fn();

		wrapper.find('form').simulate('submit', {preventDefault});
		expect(dispatch).toHaveBeenCalledWith(mockCreateEmployee);
	});

	it('should dispatch hideModal() on click cancel', () => {
		dispatch = jest.fn();
		wrapper = shallow(<CreateEmployeeForm dispatch={dispatch} {...props}/>);

		wrapper.find('.form-reset-btn').simulate('click');
		expect(dispatch).toHaveBeenCalledWith(hideModal());
	});
});