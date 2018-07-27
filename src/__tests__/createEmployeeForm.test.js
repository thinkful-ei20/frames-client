import React from 'React';
import {shallow} from 'enzyme';
import {AddEmployeeForm} from '../components/forms/create-employee-form';

describe('Add Employee Form', () => {
	it('should render without crashing', () => {
		shallow(<AddEmployeeForm />);
	});
});