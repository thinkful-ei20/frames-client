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
		// Alert user if unable to submit form
		let error = null;
		if (this.props.error) {
			error = (
				<div className="form-modal-error" aria-live="polite">
					{this.props.error}
				</div>
			);
		}

		return (
			<React.Fragment>
        <button className="modal-close-btn" onClick={() => this.handleCancel()}></button>
				<div className="modal-form-wrapper">
					<div className="form-wrapper">
            <h2 className='form-header'>Add Shift</h2>
						<p className="form-modal-error" >{this.state.frameError}</p>
						<form
							onSubmit={e => this.handleSubmit(e)}
						>
							<div className="form-field">
								<label htmlFor='employee-select'>Employee

								</label>
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
							<div className="form-field form-btns">
								<button className="form-reset-btn" type="reset" onClick={() => this.handleCancel()}>Cancel</button>
								<button className="form-submit-btn">Save</button>
							</div>
							{error}
						</form>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

CreateShiftForm.propTypes = {
	show: PropTypes.bool,
	dispatch: PropTypes.func,
	error : PropTypes.any,
	employees : PropTypes.array
};

const mapStateToProps = state => {
	return {
		employees: state.employees.employees,
		error: state.frames.error
	};
};

export default connect(mapStateToProps)(CreateShiftForm);