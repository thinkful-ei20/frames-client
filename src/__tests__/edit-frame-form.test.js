import React from 'react';
import {shallow} from 'enzyme';

import {EditFrameForm} from '../components/forms/edit-frame-form';
import {hideModal} from '../actions/modals';
import {clearFrameError} from '../actions/frames';

const mockEditFrame = {
	type: 'UPDATE_FRAME'
};

const mockDeleteFrame = {
	type: 'DELETE_FRAME'
};

jest.mock('../actions/frames', () => Object.assign({},
	require.requireActual('../actions/frames'),
	{
		editFrame: jest.fn().mockImplementation(() => {
			return mockEditFrame;
		}),
		deleteFrame: jest.fn().mockImplementation(() => {
			return mockDeleteFrame;
		}),
	}
));

describe('<EditFrameForm/>', () => {

	let wrapper;
	let dispatch;

	const props = {
		error: null,
		employees:{
			employees:[{}]
		},
		currentFrame: {}
	};

	it('should render without crashing', () => {
		dispatch = jest.fn();
		shallow(
			<EditFrameForm dispatch={dispatch} {...props}/>);
	});

	it('should contain the correct input fields and buttons', () => {
		dispatch = jest.fn();
		wrapper = shallow(<EditFrameForm dispatch={dispatch} {...props}/>);

		expect(wrapper.find('select #employee-select')).toHaveLength(1);
		expect(wrapper.find('input #startDate')).toHaveLength(1);
		expect(wrapper.find('input #endDate')).toHaveLength(1);
		expect(wrapper.find('button .modal-close-btn')).toHaveLength(1);
		expect(wrapper.find('.form-delete-btn')).toHaveLength(1);
		expect(wrapper.find('.form-reset-btn')).toHaveLength(1);
		expect(wrapper.find('.form-submit-btn')).toHaveLength(1);
	});

	it('should dispatch addFrame() on submit', () => {
		dispatch = jest.fn();
		wrapper = shallow(<EditFrameForm dispatch={dispatch} {...props}/>);

		const preventDefault = jest.fn();

		wrapper.find('form').simulate('submit', {preventDefault});
		expect(preventDefault).toHaveBeenCalled();
		expect(dispatch).toHaveBeenCalledWith(mockEditFrame);
	});

	it('should dispatch clearFrameError() and set local state on click reset', () => {
		dispatch = jest.fn();
		wrapper = shallow(<EditFrameForm dispatch={dispatch} {...props}/>);

		wrapper.find('.form-reset-btn').simulate('click');
		expect(dispatch).toHaveBeenCalledWith(clearFrameError());
		expect(wrapper.state()['error']).toEqual(null);
	});

	it('should dispatch clearFrameError() and hideModal() on click close button on modal', () => {
		dispatch = jest.fn();
		wrapper = shallow(<EditFrameForm dispatch={dispatch} {...props}/>);

		wrapper.find('button .modal-close-btn').simulate('click');
		expect(dispatch).toHaveBeenCalledWith(hideModal());
		expect(dispatch).toHaveBeenCalledWith(clearFrameError());
	});

	it('should dispatch deleteFrame() on click delete', () => {
		dispatch = jest.fn();
		wrapper = shallow(<EditFrameForm dispatch={dispatch} {...props}/>);

		wrapper.find('.form-delete-btn').simulate('click');
		expect(dispatch).toHaveBeenCalledWith(mockDeleteFrame);
	});

	/**
	 * TODO:
	 * 		Update validateFrames to use the onChange...
	 * 		event to pass values instead of document.getElementById()
	 */
	// it('should run validateFrame() on change for \'Start Time\' and \'End Time\' inputs', () => {
	// 	dispatch = jest.fn();
	// 	wrapper = shallow(<EditFrameForm dispatch={dispatch} {...props}/>);
	// 	wrapper.find('input #startDate').simulate('change',{target: {value: startDate}} );
	// 	wrapper.find('input #endDate').simulate('change',{target: {value: endDate}} );
	// });
});