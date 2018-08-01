import React from 'react';
import {shallow} from 'enzyme';
import {CreateEmployeeForm} from '../components/forms/create-employee-form';

describe('Create Employee Form', () => {
	it('should render without crashing', () => {
		shallow(<CreateEmployeeForm />);
	});
});