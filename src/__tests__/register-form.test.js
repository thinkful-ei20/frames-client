import React from 'React';
import {shallow} from 'enzyme';
import {RegisterForm} from '../components/Forms/registerForm';

describe('RegisterForm', () => {
	it('should render without crashing', () => {
		shallow(<RegisterForm />);
	});
});