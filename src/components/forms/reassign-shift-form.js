import React from 'react';
import {connect} from 'react-redux';

import './styles/forms.css';
import { fetchReassignShift } from '../../actions/reassignShift';
import { fetchFrames } from '../../actions/frames';
import { hideModal } from '../../actions/modals';
import { getThisWeek } from '../../actions/utils';

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
		const dates = getThisWeek();
		const employeeId = data.get('employee-select');
		this.props.dispatch(fetchReassignShift(this.props.frameId, {employeeId}));
		this.props.dispatch(hideModal());
		this.props.dispatch(fetchFrames(dates.start, dates.end));
	}

	render() {
		return(
			<div className="form-wrapper">
				<h2 className="form-header">Reassign Shift</h2>
				<form onSubmit={(e) => this.handleSubmit(e)}>
					<label htmlFor="employee-select">Select an Employee</label>
					<select id="employee-select" name="employee-select">
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
				<button onClick={() => this.props.dispatch(hideModal())}
				>Cancel</button>
			</div>
			
		);
	}
}

const mapStateToProps = state => ({
	// isLoading: state.employee.reassign === null,
	frameId : state.modal.currentId,
	employees: state.employees
});

export default connect(mapStateToProps)(ReassignShiftForm);