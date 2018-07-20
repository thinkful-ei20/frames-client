import React from 'react';
import {connect} from 'react-redux';
import { fetchReassignShift } from '../../actions/reassignShift';
import { hideModal } from '../../actions/modals';
import PropTypes from 'prop-types';
import './styles/forms.css';

export class ReassignShiftForm extends React.Component {

	handleSubmit(e) {
		e.preventDefault();
		const data = new FormData(e.target);
		const employeeId = data.get('employee-select');
		this.props.dispatch(fetchReassignShift(this.props.frameId, {employeeId}));
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

ReassignShiftForm.propTypes = {
	employees : PropTypes.object,
	dispatch : PropTypes.func,
	frameId : PropTypes.string
};

const mapStateToProps = state => ({
	frameId : state.modal.currentId,
	employees: state.employees
});

export default connect(mapStateToProps)(ReassignShiftForm);