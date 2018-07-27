import React from 'react';
import {NavBar} from '../components/navBar';
import {shallow} from 'enzyme';

describe('Footer', () => {

	describe('Unconnected' ,() => {

		let wrapper;
		const props = {
			loggedIn : false,
		};

		const dispatch = jest.fn();

		beforeEach(() => {
			wrapper = shallow(<NavBar dispatch={dispatch} {...props}/>);
		});

		it('should render without crashing', () => {
			expect(wrapper).toHaveLength(1);
		});
	});
});