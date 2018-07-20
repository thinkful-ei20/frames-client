import React from 'react';
import {connect} from 'react-redux';

import './styles/forms.css';
import { hideModal } from '../../actions/modals';

export class EditShiftForm extends React.Component {
	render() {
		console.log(this.props);
		return(
			<div className="form-wrapper">
				<h2 className="form-header">Edit Shift</h2>
				<form>
					<fieldset>
						<legend>
							Choose New Start Time or Date
						</legend>
						<label htmlFor="startDate">Start Time</label>
						<input
							type="datetime-local"
							id="startDate"
							name="startDate"
							value="2018-06-12T19:30" //To be pulled from server
						/>
						<label htmlFor="endDate">End Time</label>
						<input
							type="datetime-local"
							id="endDate"
							name="endDate"
							value="2018-06-12T19:30" //To be pulled from server
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

const mapStateToProps = state => ({
	
});

export default connect()(EditShiftForm);