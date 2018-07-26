import React from 'React';
import {shallow} from 'enzyme';
import {Dashboard} from '../components/dashboard';

describe('Dashboard', () => {

	const props = {
		loggedIn : true,
		frames: [],
		loading : false,
		error : null,
		filter: 'test'
	};

	it('should render without crashing', () => {
		const dispatch = jest.fn();

		const db = <Dashboard dispatch={dispatch} {...props} />;

		shallow(db);
	});
});