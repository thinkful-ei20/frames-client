import React from 'React';
import {shallow} from 'enzyme';
import {showModal} from '../actions/modals';
import {Dashboard} from '../components/dashboard';

/**
 * TODO:
 * 	Figure out how to test lifecycle methods
 */

// import {Provider} from 'react-redux';
// import {fetchFrames} from '../actions/frames';
// import {fetchEmployees} from '../actions/employee';
// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';

describe('Dashboard', () => {

	describe('Unconnected', () => {

		let wrapper;

		const props = {
			loggedIn : true,
			frames: [],
			loading : false,
			error : null,
			filter: {
				employeeId: '000020test1989812379817',
				startFrame: '2018-07-27T12:00:00.000Z',
				endFrame: '2018-07-27T15:00:00.000Z',
			}
		};

		const dispatch = jest.fn();

		beforeEach(() => {
			wrapper = shallow(<Dashboard dispatch={dispatch} {...props}/> );
		});

		it('should render without crashing', () => {
			expect(wrapper).toHaveLength(1);
		});

		it('toggle dispatch showModal() on clicking "newShift" button',() => {
			const newShiftButton = wrapper.find('button').at(0);

			newShiftButton.simulate('click');
			expect(dispatch).toHaveBeenCalledWith(showModal('newShift', null));
		});

		it('should dispatch showModal() on clicking "superFilter" button',() => {
			const superFilterButton = wrapper.find('button').at(1);

			superFilterButton.simulate('click');
			expect(dispatch).toHaveBeenCalledWith(showModal('superFilter', null));
		});
	});

	// describe('Connected', () => {});

	// 	let wrapper;
	// 	let store;

	// 	const reduxState = {
	// 		auth : {
	// 			user : 'not null'
	// 		},
	// 		frames: {
	// 			frames: [],
	// 			loading: false,
	// 			error: null
	// 		},
	// 		filter : {
	// 			filter: 'Test'
	// 		}
	// 	};

	// 	const localState = {
	// 		addShiftOpen: false,
	// 		advanFilter: false
	// 	};

	// 	const middlewares = [thunk];
	// 	const dispatch = jest.fn();
	// 	const mockStore = configureMockStore(middlewares);

	// 	beforeEach(() => {
	// 		store = mockStore(reduxState);
	// 		wrapper = shallow(<ConnectedDashboard store={store} state={localState} dispatch={dispatch}/>);
	// 	});

	// 	it('should render without crashing', () => {
	// 		expect(wrapper).toHaveLength(1);
	// 	});

	// 	it('should toggle "advanFitler" state on clicking "Advanced Filter" button', () => {
	// 		const dashboard = wrapper.instance();
	// 		console.log(dashboard);
	// 	});
	// });
});