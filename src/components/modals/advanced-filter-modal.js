import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { setStartValue, setEndValue, setDayValue, advancedFilterSuccess } from '../../actions/filter';
import moment from 'moment';

import './styles/advanced-filter-modal.css';

class AdvancedFilter extends React.Component {

	setStartParameter(e) {
		console.log(`AF-START: ${e.target.value}`);
		this.props.dispatch(setStartValue(e.target.value));
	}

	setEndParameter(e) {
		console.log(`AF-END: ${e.target.value}`);
		this.props.dispatch(setEndValue(e.target.value));
	}

	setDayParameter(e) {
		console.log(`AF-DOTW: ${e.target.value}`);
		this.props.dispatch(setDayValue(e.target.value));
	}

	advanfilterByTimeFrame(e) {
		e.preventDefault();
		console.log('Submitting Advanced Filter');
		let filter;
		// if the start and end are null but the day is not, the filter is the day
		if ((this.props.start === null && this.props.end === null) && (this.props.day !== '')) {
			filter = `${this.props.day}`;
		}
		// if the start and end are not null but the day is, the filter is the start|end
		if ((this.props.start !== null && this.props.end !== null) && this.props.day === null) {
			filter = `${this.props.start}|${this.props.end}`;
		}
		// if all three are not null, the filter is start|end|day
		if (this.props.start !== null && this.props.end !== null && this.props.day !== null) {
			filter = `${this.props.start}|${this.props.end}|${this.props.day}`;
		}
		console.log(filter);
		this.props.dispatch(advancedFilterSuccess(filter));
		this.props.onClose();
	}

	// RENDER
	render() {
		const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

		if(!this.props.show) {
			return null;
		}

		return(
			<div className="backdrop">
				<div className="modal">

					<form onSubmit={(e) => this.advanfilterByTimeFrame(e)}>

						<select onChange={(e) => this.setStartParameter(e)}>
							<option value=''>BEGINNING OF SHIFT</option>
							<option value="open">OPEN</option>
							{this.props.frames.map((frame, i) => {
								return(
									<option
										key={i}
										value={moment(frame.startFrame).format('LT')}
									>
										{moment(frame.startFrame).format('LT')}
									</option>);
							})}
						</select>

						<select onChange={(e) => this.setEndParameter(e)}>
							<option value=''>END OF SHIFT</option>
							<option value="open">OPEN</option>
							{this.props.frames.map((frame, i) => {
								return (
									<option
										key={i}
										value={moment(frame.endFrame).format('LT')}
									>
										{moment(frame.endFrame).format('LT')}
									</option>
								);
							})}
						</select>

						<select onChange={(e) => this.setDayParameter(e)}>
							<option value=''>DAY OF THE WEEK</option>
							<option value=''>NONE</option>
							{week.map((day, i) => {
								return(
									<option
										key={i}
										value={day}
									>
										{day}
									</option>);
							})}
						</select>

						<button className="filter-btn" type="submit">Submit Filter</button>
					</form>

					<button className="filter-cancel-btn" onClick={this.props.onClose}>Cancel</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	frames: state.frames.frames,
	start: state.filter.start,
	end: state.filter.end,
	day: state.filter.day,
	filter: state.filter.filter
});

AdvancedFilter.propTypes = {
	dispatch: propTypes.func,
	frames: propTypes.array,
	onClose: propTypes.func.isRequired,
	show: propTypes.bool,
	children: propTypes.node,
	start: propTypes.string,
	end: propTypes.string,
	day: propTypes.string
};

export default connect(mapStateToProps)(AdvancedFilter);