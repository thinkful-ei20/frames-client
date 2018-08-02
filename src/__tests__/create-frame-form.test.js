import React from 'react';
import {shallow} from 'enzyme';

import {CreateFrameForm} from '../components/forms/create-frame-form';
import {hideModal} from '../actions/modals';
import {clearFrameError} from '../actions/frames';


const mockAddFrame = {
	type: 'ADD_FRAME'
};

jest.mock('../actions/frames', () => Object.assign({},
	require.requireActual('../actions/frames'),
	{
		addFrame: jest.fn().mockImplementation(() => {
			return mockAddFrame;
		}),
	}
));

describe('<CreateFrameForm/>', () => {

	let wrapper;
	let dispatch;

	const props = {
		show: false,
		error: null,
		employees: [{}]
	};

	it('should render without crashing', () => {
		dispatch = jest.fn();
		shallow(
			<CreateFrameForm dispatch={dispatch} {...props}/>);
	});

	it('should contain the correct input fields and buttons', () => {
		dispatch = jest.fn();
		wrapper = shallow(<CreateFrameForm dispatch={dispatch} {...props}/>);

		expect(wrapper.find('select #employee-select')).toHaveLength(1);
		expect(wrapper.find('input #startDate')).toHaveLength(1);
		expect(wrapper.find('input #endDate')).toHaveLength(1);
		expect(wrapper.find('.form-submit-btn')).toHaveLength(1);
		expect(wrapper.find('.form-reset-btn')).toHaveLength(1);
	});

	it('should dispatch addFrame() on submit', () => {
		dispatch = jest.fn();
		wrapper = shallow(<CreateFrameForm dispatch={dispatch} {...props}/>);

		const preventDefault = jest.fn();

		wrapper.find('form').simulate('submit', {preventDefault});
		expect(preventDefault).toHaveBeenCalled();
		expect(dispatch).toHaveBeenCalledWith(mockAddFrame);
	});

	it('should dispatch clearFrameError() and hideModal() on click cancel', () => {

		wrapper = shallow(<CreateFrameForm dispatch={dispatch} {...props}/>);

		wrapper.find('.form-reset-btn').simulate('click');
		expect(dispatch).toHaveBeenCalledWith(clearFrameError());
		expect(dispatch).toHaveBeenCalledWith(hideModal());
	});
});
