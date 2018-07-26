import React , {Component} from 'React';
import requiresLogin from '../components/requires-login';
import {shallow, mount} from 'enzyme';

//Test Component
class Test extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<div>TEST</div>
		);
	}
}

describe('Requires Login', () => {

	it('should return a wrapped child component without crashing', () => {

		const wrapper = requiresLogin()(<Test/>);
		expect(wrapper).not.toBe(null);
	});

	it('should pass props down to child component', () => {
		const toPassDown = { passMeDown: 'test'};
		const authProps = {
			authenticating: false,
			loggedIn: true,
			error: null,
		};

		const props = Object.assign({},authProps, toPassDown);

		//Set up the function wrapper
		const wrapper = requiresLogin()(<Test/>);
		const output = wrapper.WrappedComponent(props);

		expect(output.props).toHaveProperty('passMeDown');
		expect(output.props.passMeDown).toEqual(toPassDown['passMeDown']);
	});

	it('should redirect with Redirect component from "react-router-dom"', () => {

		const props = {
			authenticating: false,
			loggedIn: false,
			error: null
		};

		//Set up the function wrapper
		const wrapper = requiresLogin()(<Test/>);
		const output = wrapper.WrappedComponent(props);

		expect(output.type.name).toEqual('Redirect');

	});
});