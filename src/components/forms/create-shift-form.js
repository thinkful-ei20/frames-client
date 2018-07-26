import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addFrame } from '../../actions/edit-frame';

import '../../App.css';
import { getToday } from '../../actions/utils';
import { hideModal } from '../../actions/modals';

class CreateShiftForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			frameError: null
		};
	}

	handleSubmit (e) {
		e.preventDefault();

		const data = new FormData(e.target);
		const newFrame = {
			employeeId : data.get('employee-select'),
			startFrame : data.get('startDate'),
			endFrame : data.get('endDate')
		};

		//Check to see if frame is 'open' and set employeeID to null
		if (newFrame.employeeId === 'open'){
			newFrame.employeeId = null;
		}

		this.props.dispatch(addFrame(newFrame));
		this.props.dispatch(hideModal());
	}

	validateFrame() {
		// Validate that the endFrame is later than the start frame
		const start = new Date(document.getElementById('startDate').value);
		const end = new Date(document.getElementById('endDate').value);

		if(start > end){
			this.setState({frameError : 'The end of the shift must be later than the start'});
		} else {
			this.setState({frameError : null});
		}
	}

	handleCancel() {
		this.props.dispatch(hideModal());
	}

	render() {

		// Alert user if unable to populate employees
		let error = null;
		if (this.props.error) {
			error = (
				<div className="form-error" aria-live="polite">
					{this.props.error}
				</div>
			);
		}

		return (
			<React.Fragment>

				<div className="add-shift-form-wrapper">
					{this.props.error}
					{error}
					<h2 className='form-header'>Add Shift</h2>
					<button className="modal-close-btn" onClick={() => this.handleCancel()}>
					</button>
					
					<div className="form-wrapper">
					<p className="form-modal-error" >{this.state.frameError}</p>
						<form
							onSubmit={e => this.handleSubmit(e)}
						>
							<div className="form-field">
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
							</div>

							<div className="form-field">
								<label htmlFor="startDate">From</label>
								<input
									name="startDate"
									id="startDate"
									type="datetime-local"
									defaultValue={getToday().start}
									onChange={() => this.validateFrame()}
								/>
							</div>

							<div className="form-field">
								<label htmlFor="endDate">To</label>
								<input
									name="endDate"
									id="endDate"
									type="datetime-local"
									defaultValue={getToday().start}
									onChange={() => this.validateFrame()}
								/>
							</div>
							<button
								type='submit'
								className="form-submit-btn">
                Save
							</button>
						</form>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

CreateShiftForm.propTypes = {
	onClose: PropTypes.func.isRequired,
	show: PropTypes.bool,
	dispatch: PropTypes.func,
	error : PropTypes.any,
	employees : PropTypes.object
};

const mapStateToProps = state => {
	return {
		employees: state.employees.employees,
		error: state.employees.error
	};
};

export default connect(mapStateToProps)(CreateShiftForm);