import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import {filterSuccess} from '../../actions/filter';
import {hideModal} from '../../actions/modals';

import './styles/forms.css';

export class SuperFilter extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			frameError : null
		};
	}

	removeDuplicates(arr) {
		let uniqueArray = [];
		for (let i = 0; i < arr.length; i++) {
			if (uniqueArray.indexOf(arr[i]) === -1 && arr[i] !== undefined) {
				uniqueArray.push(arr[i]);
			}
		}
		return uniqueArray;
	}

	handleSubmit(e){
		e.preventDefault();
		const data = new FormData(e.target);
		let start;
		let end;

		if(data.get('filterByTime')){
			start = data.get('filterByTime').split('|')[0];
			end= data.get('filterByTime').split('|')[1];
		} else {
			start = data.get('startdatetime');
			end = data.get('enddatetime');
		}

		const employeeId = data.get('employee-select');

		this.props.dispatch(filterSuccess(employeeId, start, end));
		this.props.dispatch(hideModal());
	}

	handleCancel() {
		this.props.dispatch(hideModal());
	}

	validateFrame() {
		// Validate that the endFrame is later than the start frame
		const start = new Date(document.getElementById('startdatetime').value);
		const end = new Date(document.getElementById('enddatetime').value);

		if(start > end){
			this.setState({frameError : 'The end of the shift must be later than the start'});
		} else if (start.getDate() !== end.getDate()){
			this.setState({frameError : 'The shift may only be scheduled for one day, if you need to schedule multiple days, please create multiple frames.'});
		} else {
			this.setState({frameError : null});
		}
	}

	render(){
		// Define default values for the form, remove the trailing GMT times
		const defaultStart = moment().format().slice(0,-9);
		const defaultEnd = moment().format().slice(0,-9);

		return (
			<React.Fragment>
				<div className="modal-form-wrapper">
					<button
						className="modal-close-btn"
						title="Close filter"
						onClick={() => this.handleCancel()}>
					</button>
					<div className="form-wrapper">
						<h2 className='form-header'>Advanced Filter</h2>
						
						<form onSubmit={e => this.handleSubmit(e)}>
							<fieldset>
								<legend>Filter</legend>
								<div className="form-field">
									<label className="employee-select">Filter by employee:
										<select
											id="employee-select"
											name="employee-select"
										>
											<option value=''>FILTER BY EMPLOYEE</option>
											{this.props.employees.map((employee, i) =>
												<option key={i} value={employee.id}>
													{`${employee.firstname} ${employee.lastname}`}
												</option>
											)}
											<option value='open'>OPEN</option>
										</select>
									</label>
								</div>
								<div className="form-field">
									<label className="filterByTime">Filter by frames:
										<select
											htmlFor="filterByTime"
											name="filterByTime"
											id="filterByTime"
										>
											<option value=''>FILTER TIME FRAMES</option>
											{this.removeDuplicates(this.props.frames).map((frame, i) => {
												return (
													<option
														key={i}
														value={`${moment(frame.startFrame).format('YYYY-MM-DDTHH:mm')}|${moment(frame.endFrame).format('YYYY-MM-DDTHH:mm')}`}
													>
														{moment(frame.startFrame).format('LT')} - {moment(frame.endFrame).format('LT')}
													</option>
												);
											})}
										</select>
									</label>
								</div>
								<div className="form-field">
									<label htmlFor='startdatetime'>Select Start Date and Time</label>
									<input
										id='startdatetime'
										name='startdatetime'
										type='datetime-local'
										onChange={() => this.validateFrame()}
										defaultValue={defaultStart}
									/>
								</div>
								<div className="form-field">
									<label htmlFor='enddatetime'>Select End Date and Time</label>
									<input
										id='enddatetime'
										name='enddatetime'
										type='datetime-local'
										onChange={() => this.validateFrame()}
										defaultValue={defaultEnd}
									/>
								</div>
								<div className="form-field-error">{this.state.frameError}</div>
								<div className="form-field form-btns">
									<button className="form-reset-btn" type="button" onClick={() => this.handleCancel()}>Cancel</button>
									<button className="form-submit-btn" type="submit">Submit</button>
								</div>
							</fieldset>
						</form>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

SuperFilter.propTypes = {
	employees : PropTypes.array,
	frames : PropTypes.array,
	dispatch : PropTypes.func
};

const mapStateToProps = state => {
	return {
		employees : state.employees.employees,
		frames: state.frames.frames
	};
};

export default connect(mapStateToProps)(SuperFilter);