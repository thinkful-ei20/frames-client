import React from 'react';
import {shallow} from 'enzyme';

import {CreateEmployeeForm} from '../components/forms/create-employee-form';
import {hideModal} from '../actions/modals';
import {clearFrameError} from '../actions/frames';

describe('Create Employee Form', () => {
	let wrapper;
	const dispatch = jest.fn();
	const props = {
		error:  null
	};
	it('should render without crashing', () => {
		shallow(<CreateEmployeeForm dispatch={dispatch} {...props}/>);
	});


	it('should contain the correct input fields and buttons', () => {
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

	it('should submit on click', () => {
		wrapper = shallow(<CreateEmployeeForm dispatch={dispatch} {...props}/>);
		const preventDefault = jest.fn();

		wrapper.find('form').simulate('submit', {preventDefault});
		expect(dispatch).toHaveBeenCalled();  // <-- Could be Improved
	});

	it('should cancle on click', () => {
		wrapper = shallow(<CreateEmployeeForm dispatch={dispatch} {...props}/>);

		wrapper.find('.form-reset-btn').simulate('click');
		expect(dispatch).toHaveBeenCalledWith(clearFrameError());
		expect(dispatch).toHaveBeenCalledWith(hideModal());
	});

});