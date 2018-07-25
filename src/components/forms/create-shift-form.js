import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addFrame } from '../../actions/edit-frame';

import '../../App.css';

class CreateShiftForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			frameError: null
		};
	}

	handleSubmit (values) {
		// const frame = {
		//   employeeId: (values.employee && (values.employee !== 'open')) ? values.employee : null,
		//   startFrame: values.startDate,
		//   endFrame: values.endDate
		// };
		// this.props.dispatch(addFrame(frame));
		// this.props.onClose();
	}

	validateFrame() {

	}

	render() {

    console.log(new Date().toLocaleString());
		// Render nothing if the "show" prop is false
		if(!this.props.show) {
			return null;
		}

		// Alert user if unable to populate employees
		let error;
		if (this.props.error) {
			error = (
				<div className="form-error" aria-live="polite">
					{this.props.error}
				</div>
			);
		}

		return (
			<div className="backdrop">
				<div className="modal">
					<button className="modal-close-btn" onClick={this.props.onClose}>
					</button>
					<div className="add-shift-form-wrapper">
						{this.props.error}
						<h2>Add Shift</h2>
						<form
							className="add-shift-form"
							onSubmit={this.handleSubmit()}
						>
							<label htmlFor='employee-select'>Employee</label>
							<select
								id="employee-select"
								name="employee-select"
							>
								{this.props.employees.map((employee, i) =>
									<option key={i} value={employee.id}>
										{`${employee.firstname} ${employee.lastname}`}
									</option>
								)}
								<option value='open'>OPEN</option>
							</select>
							<label htmlFor="startDate">From</label>
							<input
								name="startDate"
								id="startDate"
								type="datetime-local"
								defaultValue={new Date().toLocaleString()}
							/>
							<label htmlFor="endDate">To</label>
							<input
								name="endDate"
								id="endDate"
								type="datetime-local"
							/>
							<button className="form-submit-btn">Save</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

CreateShiftForm.propTypes = {
	onClose: PropTypes.func.isRequired,
	show: PropTypes.bool,
	children: PropTypes.node
};

const mapStateToProps = state => {
	return {
		employees: state.employees.employees,
		error: state.employees.error
	};
};

export default connect(mapStateToProps)(CreateShiftForm);