import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import {hideModal} from '../../actions/modals';
import {editFrame, deleteFrame, clearFrameError} from '../../actions/frames';

import './styles/forms.css';

export class EditFrameForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			employee: props.currentFrame.employeeId ? props.currentFrame.employeeId.id : 'open',
			error: null
		}
	}

	handleSubmit = e => {
		e.preventDefault();
		//Grab data from the form and descructure into an object to send to the server
		const data = new FormData(e.target);
		const updatedFrame = {
			employeeId : data.get('employee-select'),
			startFrame : data.get('startDate'),
			endFrame : data.get('endDate')
		};

		// If shift is open, send employeeId as null
		if (updatedFrame.employeeId === 'open'){
			updatedFrame.employeeId = null;
		}
		
		// grab the id of the current frame from the modal state
		this.props.dispatch(editFrame(this.props.currentFrame.id, updatedFrame));
	};

	handleEmployeeSelect = e => {
		this.setState({employee: e.target.value})
	};

	validateFrame = () => {
		// Validate that the endFrame is later than the start frame

		const start = new Date(document.getElementById('startDate').value);
		const end = new Date(document.getElementById('endDate').value);

		if(start >= end) {
			this.setState({error : 'The end time must be later than the start time'});
		} else if (start.getDate() !== end.getDate()){
			this.setState({error : 'The shift may only be scheduled for one day, if you need to schedule multiple days, please create multiple frames.'});
		}else {
			this.setState({error : null});
			this.props.dispatch(clearFrameError());
		}
	}	

	handleReset = () => {
		this.setState({error: null});
		this.props.dispatch(clearFrameError());
	};

	handleCancel() {
		this.props.dispatch(hideModal());
		this.props.dispatch(clearFrameError());
	}

	render() {
		// Define default values for the form, remove the trailing GMT times
		const defaultStart = moment(this.props.currentFrame.startFrame).format().slice(0,-6);
		const defaultEnd = moment(this.props.currentFrame.endFrame).format().slice(0,-6);

    // Alert user if unable to submit form
    let error = null;
    if (this.props.error) {
      error = (
        <div className="form-modal-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }

    if (this.state.error) {
    	error = (
    		<div className="form-modal-error" aria-live="polite">
					{this.state.error}
				</div>
			);
		}

		return(
			<div className="modal-form-wrapper">
				<button
					className="modal-close-btn"
					title="Close edit frame form"
					onClick={() => this.handleCancel()}>
				</button>
				<div className="form-wrapper">
					<h2 className="form-header">Edit Frame</h2>
					<form onSubmit={this.handleSubmit}>
					<fieldset>
						<legend>Edit Frame</legend>
						<div className="form-field">
							<label htmlFor="employee-select">Employee</label>
							<select
								id="employee-select"
								name="employee-select"
								defaultValue={this.state.employee}
								onChange={this.handleEmployeeSelect}
							>
								{this.props.employees.employees.map((employee, i) =>
										<option key={i} value={employee.id}>
											{`${employee.firstname} ${employee.lastname}`}
										</option>
									)}
								<option value='open'>OPEN</option>
							</select>
						</div>
						<div className="form-field">
							<label htmlFor="startDate">Start Time
								<input
									type="datetime-local"
									id="startDate"
									name="startDate"
									defaultValue={defaultStart}
									onChange={this.validateFrame}
								/>
							</label>
						</div>
						<div className="form-field">
							<label htmlFor="endDate">End Time
								<input
									type="datetime-local"
									id="endDate"
									name="endDate"
									defaultValue={defaultEnd}
									onChange={this.validateFrame}
								/>
							</label>
						</div>
						<div className="form-field form-btns">
							<button
								className="form-delete-btn"
								title="Delete frame"
								type="button"
								onClick={() => this.props.dispatch(deleteFrame(this.props.currentFrame.id))}>
								<i className="fa fa-trash-o" aria-hidden="true"></i>
							</button>
							<button
								className="form-reset-btn"
								type="reset"
								title="Reset frame form"
								onClick={this.handleReset}>
								Reset
							</button>
							<button
								className="form-submit-btn"
								title="Submit Edited Frame"
								type="submit"
								disabled={this.state.error || this.props.error}>
								Save
							</button>
						</div>
					{error}
          </fieldset>
					</form>
			</div>
			</div>);
	}
}

EditFrameForm.propTypes = {
	dispatch : PropTypes.func,
	currentFrame : PropTypes.object,
	employees : PropTypes.object
};

const mapStateToProps = state => {
	const id = state.modal.currentId;
	return {
		currentFrame : state.frames.frames.filter(frame => frame.id === id)[0],
		employees: state.employees,
		error: state.frames.error,
	};
};

export default connect(mapStateToProps)(EditFrameForm);