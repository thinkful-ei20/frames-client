import React from 'react';
import {shallow} from 'enzyme';
import {AddEmployeeForm} from '../components/forms/create-employee-form';

describe('Create Employee Form', () => {
	it('should render without crashing', () => {
		shallow(<AddEmployeeForm />);
	});
});