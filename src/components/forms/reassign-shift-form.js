import React from 'react';
import {connect} from 'react-redux';

import './styles/forms.css';
import { fetchReassignShift } from '../../actions/reassignShift';
import { fetchFrames } from '../../actions/frames';

export class ReassignShiftForm extends React.Component {
	constructor(props) {
		super(props);

	}

	componentDidMount() {
		/* Make the call to the API to fetch employees */
		// this.props.dispatch(fetchFrames());
		
	}

	handleSubmit(e) {
		e.preventDefault();
		const data = new FormData(e.target);
		console.log(`data: ${data.getAll('employee-select')}`);
		// this.props.dispatch(fetchReassignShift(e.data));
	}

	render() {
		return(
			<div className="form-wrapper">
				<h2 className="form-header">Reassign Shift</h2>
				<form onSubmit={(e) => this.handleSubmit(e)}>
					<select id="employee-select">
						<option>SELECT EMPLOYEE</option>
						{this.props.employees.employees.map((employee, i) => {
							return (
								<option key={i} value={employee.id}>
									{`${employee.firstname} ${employee.lastname}`}
								</option>
							);})}
						<option value='open'>OPEN</option>
					</select>
					<button type="submit">Submit</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	// isLoading: state.employee.reassign === null,
	frames: state.frames,
	employees: state.employees
});

export default connect(mapStateToProps)(ReassignShiftForm);