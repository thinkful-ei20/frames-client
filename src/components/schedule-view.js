import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {getThisMonth, getThisWeek, getToday} from '../actions/utils';
import { setFramesView, fetchFrames } from '../actions/frames';

export class ScheduleView extends React.Component {

	handleDaily(){
		const dates = getToday();
		this.props.dispatch(setFramesView('daily'));
		this.props.dispatch(fetchFrames(dates.start, dates.end));
	}

	handleWeekly(){
		const dates = getThisWeek();
		this.props.dispatch(setFramesView('weekly'));
		this.props.dispatch(fetchFrames(dates.start, dates.end));
	}

	handleMonthly(){
		const dates = getThisMonth();
		this.props.dispatch(setFramesView('monthly'));
		this.props.dispatch(fetchFrames(dates.start, dates.end));
	}

	render(){
		let startSchedule = moment(getThisWeek().start).format('MMMM, DD');
		let endSchedule = moment(getThisWeek().end).format('MMMM, DD');
		if (this.props.view === 'daily'){
			startSchedule = moment(getToday().start).format('MMMM, DD');
			endSchedule = moment(getToday().end).format('MMMM, DD');
		}
		if (this.props.view === 'monthly'){
			startSchedule = moment(getThisMonth().start).format('MMMM, DD');
			endSchedule = moment(getThisMonth().end).format('MMMM, DD');
		}

		return (
			<div>
				{startSchedule} - {endSchedule}
				<div>
					<button
						onClick={() => this.handleDaily()}
					>
            Daily
					</button>
					<button
						onClick={() => this.handleWeekly()}
					>
            Weekly
					</button>
					<button
						onClick={() => this.handleMonthly()}
					>
            Monthly
					</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		view : state.frames.view
	};
};

export default connect(mapStateToProps)(ScheduleView);