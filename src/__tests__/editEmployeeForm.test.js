import React from 'react';
import {shallow} from 'enzyme';
import {EditEmployeeForm} from '../components/forms/edit-employee-form';

describe('Edit Employee Form', () => {
	it('should render without crashing', () => {
		shallow(<EditEmployeeForm
			dispatch={jest.fn}
			id='testid'
			employee={{}}
			error={null}
		/>);
	});
});