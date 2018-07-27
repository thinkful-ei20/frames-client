import React from 'React';
import {shallow, mount} from 'enzyme';
import thunk from 'redux-thunk';
import ConnectedDashboard, {Dashboard} from '../components/dashboard';
import {Provider} from 'react-redux';
import {fetchFrames} from '../actions/frames';
import {fetchEmployees} from '../actions/employee';
import configureMockStore from 'redux-mock-store';
import {AdvancedFilter} from '../components/modals/advanced-filter-modal';

describe('Dashboard', () => {

	describe('Unconnected', () => {

		let wrapper;

		const props = {
			loggedIn : true,
			frames: [],
			loading : false,
			error : null,
			filter: 'test'
		};

		const dispatch = jest.fn();

		beforeEach(() => {
			wrapper = shallow(<Dashboard dispatch={dispatch} {...props}/> );
		});

		it('should render without crashing', () => {
			expect(wrapper).toHaveLength(1);
		});

		it('should have the correct initial state', () => {
			let {advanFilter,addShiftOpen} = wrapper.instance().state;
			expect(advanFilter).toEqual(false);
			expect(addShiftOpen).toEqual(false);
		});

		it('toggle "advanFitler" state on toggleAdvancedFilter',() => {
			const instance = wrapper.instance();

			instance.toggleAdvancedFilter();
			const on = instance.state.advanFilter;
			instance.toggleAdvancedFilter();
			const off = instance.state.advanFilter;
			expect(on).toEqual(true);
			expect(off).toEqual(false);
		});

		it('toggle "show" prop on clicking "Advanced Filter" button',() => {
			const advancedFilterButton = wrapper.find('button').at(1);

			expect(wrapper.find('div .dashboard-section-header').children().at(3).props().show).toEqual(false);
			advancedFilterButton.simulate('click');
			expect(wrapper.find('div .dashboard-section-header').children().at(3).props().show).toEqual(true);
		});
	});

	// describe('Connected', () => {

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