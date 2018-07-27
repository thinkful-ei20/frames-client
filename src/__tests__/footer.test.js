import React from 'react';
import Footer from '../components/footer';
import {shallow} from 'enzyme';

describe('Footer', () => {
	it('should render without crashing', () => {
		const wrapper = shallow(<Footer/>);
		expect(wrapper).toHaveLength(1);
	});
});