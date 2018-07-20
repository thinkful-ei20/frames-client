import React from 'react';
import {connect} from 'react-redux';

import './styles/forms.css';
import { fetchReassignShift } from '../../actions/reassignShift';
import { fetchFrames } from '../../actions/frames';

export class ReassignShiftForm extends React.Component {
	constructor(props) {
		super(props);

	}

	componentDidMount() {
		/* Make the call to the API to fetch employees */
		// this.props.dispatch(fetchFrames());
	}

	handleSubmit(e, values) {
		e.preventDefault();
		const data = new FormData(e.target);
		// console.log(`data: ${data}`);
		console.log(values);
		// this.props.dispatch(fetchReassignShift(e.data));
	}

	render() {
		// console.log('FRAMES:', this.props.frames.frames.map(frame => <option value={`${frame.employeeId.firstname} ${frame.employeeId.lastname}`}>
		// 	{`${frame.employeeId.firstname} ${frame.employeeId.lastname}`}
		// </option>));
		return(
			<div className="form-wrapper">
				<h2 className="form-header">Reassign Shift</h2>
				<form onSubmit={(e) => this.handleSubmit(e)}>
					<select>
						<option>SELECT EMPLOYEE</option>
						{this.props.frames.frames.map(frame => {
							<option value={`${frame.employeeId.firstname} ${frame.employeeId.lastname}`}>
								{`${frame.employeeId.firstname} ${frame.employeeId.lastname}`}
							</option>;
						})}
					</select>
					<button type="submit">Submit</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	// isLoading: state.employee.reassign === null,
	frames: state.frames
});

export default connect(mapStateToProps)(ReassignShiftForm);