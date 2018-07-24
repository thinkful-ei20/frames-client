import React from 'react';
import {connect} from 'react-redux';

import './styles/forms.css';
import { hideModal } from '../../actions/modals';
import { editFrame, deleteFrame } from '../../actions/edit-frame';
import PropTypes from 'prop-types';

export class EditShiftForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { employee: props.currentFrame.employeeId.id }
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
		// grab the id of the current frame from the modal state
		this.props.dispatch(editFrame(this.props.currentFrame.id, updatedFrame));
	};

	handleEmployeeSelect = e => {
		console.log(e.target.value);
		this.setState({employee: e.target.value})
	};

	render() {
		// Define default values for the form
		const defaultStart = this.props.currentFrame.startFrame.replace(' ', 'T');
		const defaultEnd = this.props.currentFrame.endFrame.replace(' ', 'T');

		return(
			<div className="form-wrapper">
				<h2 className="form-header">Edit Shift</h2>
				<form onSubmit={this.handleSubmit}>
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
					<label htmlFor="startDate">Start Time</label>
					<input
						type="datetime-local"
						id="startDate"
						name="startDate"
						defaultValue={defaultStart}
					/>
					<label htmlFor="endDate">End Time</label>
					<input
						type="datetime-local"
						id="endDate"
						name="endDate"
						defaultValue={defaultEnd}
					/>
					<button type='submit'>Change Shift</button>
          <input type="reset"/>
				</form>
				<button onClick={() => this.props.dispatch(hideModal())}>Cancel</button>
        <button onClick={() => this.props.dispatch(deleteFrame(this.props.currentFrame.id))}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
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
		employees: state.employees
	};
};

export default connect(mapStateToProps)(EditShiftForm);