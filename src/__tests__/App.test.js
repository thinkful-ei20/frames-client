import React from 'react';
import {App} from '../components/app';
import {shallow} from 'enzyme';

describe('App', () => {
	it('renders without crashing', () => {
		shallow(<App />);
	});
});
