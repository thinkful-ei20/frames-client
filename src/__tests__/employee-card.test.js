import React from 'react';
import {shallow} from 'enzyme';
import {EmployeeCard} from '../components/employee-card';

describe('Employee Card', () => {
	it('should render without crashing', () => {
		const wrapper = shallow(<EmployeeCard/>);
		expect(wrapper).toHaveLength(1);
	});
});