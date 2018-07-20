import React from 'react';
import {connect} from 'react-redux';

import './styles/forms.css';
import { fetchReassignShift } from '../../actions/reassignShift';

export class ReassignShiftForm extends React.Component {

	constructor(props) {
		super(props);

	}

	componentDidMount() {
		/* Make the call to the API to fetch employees */
		//this.props.dispatch();
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log(e.value);
		// this.props.dispatch(fetchReassignShift(e.data));
	}

	render() {
		return(
			<div className="form-wrapper">
				<h2 className="form-header">Reassign Shift</h2>
				<form onSubmit={this.handleSubmit}>
					<select>
						<option value='Employee1'>Employee1</option>
						<option value='Employee1'>Employee2</option>
						<option value='OPEN'>OPEN</option>
					</select>
					<button type="submit">Submit</button>
				</form>
			</div>);
	}
}

// const mapStateToProps = state => ({
// 	isLoading: state.employee.reassign === null,
// });

export default connect()(ReassignShiftForm);