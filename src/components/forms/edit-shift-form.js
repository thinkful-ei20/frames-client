import React from 'react';
import {connect} from 'react-redux';

import './styles/forms.css';
import { hideModal } from '../../actions/modals';
import { editFrame } from '../../actions/edit-frame-time';
import PropTypes from 'prop-types';

export class EditShiftForm extends React.Component {

	handleSubmit(e){
		e.preventDefault();
		//Grab data from the form and descructure into an object to send to the server
		const data = new FormData(e.target);
		const updatedFrame = {
			startFrame : data.get('startDate'),
			endFrame : data.get('endDate')
		};
		// grab the id of the current frame from the modal state
		this.props.dispatch(editFrame(this.props.currentFrame.id, updatedFrame));
	}

	render() {
		const foo = this.props.currentFrame.startFrame.replace(" ", "T");
		console.log(foo);
		// Default values = the current start/end of the frame
		const defaultStart = this.props.currentFrame.startFrame.replace(" ", "T");
		const defaultEnd = this.props.currentFrame.endFrame;

		return(
			<div className="form-wrapper">
				<h2 className="form-header">Edit Shift</h2>
				<form onSubmit={(e) => this.handleSubmit(e)}>
					<fieldset>
						<legend>
							Choose New Start Time or Date
						</legend>
						<label htmlFor="startDate">Start Time</label>
						<input
							type="datetime-local"
							id="startDate"
							name="startDate"
							defaultValue={defaultStart} //To be pulled from server
						/>
						<label htmlFor="endDate">End Time</label>
						<input
							type="datetime-local"
							id="endDate"
							name="endDate"
							defaultValue={defaultEnd.slice(0,-1)} //To be pulled from server
						/>
					</fieldset>
					<button type='submit'>Change Shift</button>
				</form>
				<button
					onClick={() => this.props.dispatch(hideModal())}
				>Cancel</button>
			</div>);
	}
}

EditShiftForm.propTypes = {
	dispatch : PropTypes.func,
	currentFrame : PropTypes.object
};

const mapStateToProps = state => {
	const id = state.modal.currentId;
	return {
		currentFrame : state.frames.frames.filter(frame => frame.id === id)[0]
	};
};

export default connect(mapStateToProps)(EditShiftForm);