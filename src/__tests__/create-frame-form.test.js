import React from 'react';
import {shallow} from 'enzyme';

import {CreateFrameForm} from '../components/forms/create-frame-form';
import {hideModal} from '../actions/modals';

describe('Create Shift Form Component', () => {

	let wrapper;

	const props = {
		show: false,
		error: null,
		employees: [{}]
	};
	const dispatch = jest.fn();

	it('should render without crashing', () => {
		shallow(
			<CreateFrameForm dispatch={dispatch} {...props}/>);
	});

	it('should contain the correct input fields and buttons', () => {
		wrapper = shallow(<CreateFrameForm dispatch={dispatch} {...props}/>);
		expect(wrapper.find('select #employee-select')).toHaveLength(1);
		expect(wrapper.find('input #startDate')).toHaveLength(1);
		expect(wrapper.find('input #endDate')).toHaveLength(1);
		expect(wrapper.find('.form-submit-btn')).toHaveLength(1);
		expect(wrapper.find('.form-reset-btn')).toHaveLength(1);
	});

	it('should submit on click', () => {
		wrapper = shallow(<CreateFrameForm dispatch={dispatch} {...props}/>);
		const preventDefault = jest.fn();
		wrapper.find('form').simulate('submit', {preventDefault});
		expect(preventDefault).toHaveBeenCalled();
		expect(dispatch).toHaveBeenCalled();  // <-- Could be Improved
	});

	it('should cancle on click', () => {
		wrapper = shallow(<CreateFrameForm dispatch={dispatch} {...props}/>);

		wrapper.find('.form-reset-btn').simulate('click');
		expect(dispatch).toHaveBeenCalledWith(hideModal());
	});
});
