import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { filterSuccess } from '../actions/filter';
import { hideModal } from '../actions/modals';

export class SuperFilter extends React.Component{
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

	render(){

		return (
			<form onSubmit={e => this.handleSubmit(e)}>
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

				<label htmlFor='startdatetime'> Select Specific Start Date and Time
					<input id='startdatetime' name='startdatetime' type='datetime-local' />
				</label>

				<label htmlFor='enddatetime'> Select Specific End Date and Time
					<input id='enddatetime' name='enddatetime'type='datetime-local' />
				</label>

				<button className="filter-btn" type="submit">Submit Filter</button>
			</form>
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