import React from 'React';
import {shallow} from 'enzyme';
import {RegisterForm} from '../components/forms/register-form';

describe('RegisterForm', () => {
	it('should render without crashing', () => {
		shallow(<RegisterForm />);
	});
});