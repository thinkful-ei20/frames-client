import React from 'react';
import {connect} from 'react-redux';

import './styles/forms.css';

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
		
	}

	render() {
		const employee = 'I Am place holder Employee!';
		return(
			<div className="form-wrapper">
				<h2 className="form-header">Reassign Shift</h2>
				<form onSubmit={this.handleSubmit}>
					<select>
						<option value='something'>{employee}</option>
					</select>
				</form>
			</div>);
	}
}

// const mapStateToProps = state => ({
// 	isLoading: state.employee.reassign === null,
// });

export default connect()(ReassignShiftForm);