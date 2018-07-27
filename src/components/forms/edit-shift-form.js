import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import './styles/forms.css';
import { hideModal } from '../../actions/modals';
import { editFrame, deleteFrame } from '../../actions/edit-frame';
import PropTypes from 'prop-types';

export class EditShiftForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			employee: props.currentFrame.employeeId ? props.currentFrame.employeeId.id : 'open',
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
		
		if(start > end){
			this.setState({error : 'The end of the shift must be later than the start'});
		} else {
			this.setState({error : null});
		}
	};

	handleCancel() {
		this.props.dispatch(hideModal());
	}

	render() {
		// Define default values for the form, remove the trailing GMT times
		const defaultStart = moment(this.props.currentFrame.startFrame).format().slice(0,-6);
		const defaultEnd = moment(this.props.currentFrame.endFrame).format().slice(0,-6);

		return(
			<div>
				<h2 className="form-header">Edit Shift</h2>
				<button className="modal-close-btn" onClick={() => this.handleCancel()}></button>
				<p className='form-modal-error'>{this.state.error}</p>
				<div className="form-wrapper">
				<form onSubmit={this.handleSubmit}>
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
						<label htmlFor="startDate">Start Time</label>
						<input
							type="datetime-local"
							id="startDate"
							name="startDate"
							defaultValue={defaultStart}
							onChange={this.validateFrame}
						/>
					</div>
					<div className="form-field">
						<label htmlFor="endDate">End Time</label>
						<input
							type="datetime-local"
							id="endDate"
							name="endDate"
							defaultValue={defaultEnd}
							onChange={this.validateFrame}
						/>
					</div>
					<input className="form-reset-btn" type="reset" onClick={() => this.setState({error: null})}/>
					<div className="form-btns">
						<button 
						className="form-submit-btn"
						type='submit'
						disabled={this.state.error ? true : false}>
							Change Shift
						</button>
						<button 
							className="form-delete-btn"
							onClick={() => this.props.dispatch(deleteFrame(this.props.currentFrame.id))}>
							<i className="fa fa-trash-o" aria-hidden="true"></i>
						</button>
						
					</div>
				</form>        
			</div>
			</div>);
	}
}

EditShiftForm.propTypes = {
	dispatch : PropTypes.func,
	currentFrame : PropTypes.object,
	employees : PropTypes.object
};

const mapStateToProps = state => {
	const id = state.modal.currentId;
	return {
		currentFrame : state.frames.frames.filter(frame => frame.id === id)[0],
		employees: state.employees,
		error: state.frames.error
	};
};

export default connect(mapStateToProps)(EditShiftForm);