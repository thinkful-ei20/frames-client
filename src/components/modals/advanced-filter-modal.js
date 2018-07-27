import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { setStartValue, setEndValue, setDayValue, advancedFilterSuccess } from '../../actions/filter';
import moment from 'moment';

import './styles/advanced-filter-modal.css';

class AdvancedFilter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			start: null,
			end: null,
			day: null
		};
	}

	// sets the state.start
	setStartParameter(e) {
		console.log(`Setting state.start: ${e.target.value}`);
		// this.props.dispatch(setStartValue(e.target.value));
		this.setState({ start: e.target.value });
	}

	// set end state.end
	setEndParameter(e) {
		console.log(`Setting state.end: ${e.target.value}`);
		// this.props.dispatch(setEndValue(e.target.value));
		this.setState({ end: e.target.value });
	}

	// set state.day
	setDayParameter(e) {
		console.log(`Setting state.day: ${e.target.value}`);
		// this.props.dispatch(setDayValue(e.target.value));
		this.setState({ day: e.target.value });
	}

	// set state.filter
	advanfilterByTimeFrame(e) {
		e.preventDefault();
		let filter;
		// if the start and end are null but the day is not, the filter is the day
		if ((this.state.start === null && this.state.end === null) && (this.state.day !== ('' || null || 'null'))) {
			filter = `${this.state.day}`;
		}
		// if the start and end are not null but the day is, the filter is the start|end
		if ((this.state.start !== null && this.state.end !== null) && this.state.day === null) {
			filter = `${this.state.start}|${this.state.end}`;
		}
		// if all three are not null, the filter is start|end|day
		if (this.state.start !== null && this.state.end !== null && this.state.day !== null) {
			filter = `${this.state.start}|${this.state.end}|${this.state.day}`;
		}
		console.log(`LOCAL STATE: ${this.state}`);
		console.log(`state.filter: ${filter}`);
		console.log('Submitting Advanced Filter');
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
	// start: state.filter.start,
	// end: state.filter.end,
	// day: state.filter.day,
	// filter: state.filter.filter
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