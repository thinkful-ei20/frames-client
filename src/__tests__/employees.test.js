import React from 'react';
import {shallow} from 'enzyme';
import {Employees} from '../components/employees';

describe('Employee List Page', () => {
	it('should render without crashing', () => {
		const wrapper = shallow(
			<Employees
				dispatch={jest.fn}
				employees={[{},{}]}
			/>
		);
		expect(wrapper).toHaveLength(1);
	});
});