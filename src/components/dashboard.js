import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';

import CardList from './card-list';
import ScheduleView from './schedule-view';
import requiresLogin from './requires-login';
import {fetchFrames} from '../actions/frames';
import {getThisWeek,getThisMonth,getToday} from '../actions/utils';
import {fetchEmployees} from '../actions/employee';
import {showModal} from '../actions/modals';

import './styles/dashboard.css';

export class Dashboard extends React.Component {

	componentDidMount() {
		let dates = getThisWeek();
		if (this.props.view === 'daily'){
			dates = getToday();
		}
		if (this.props.view === 'monthly'){
			dates = getThisMonth();
		}
		this.props.dispatch(fetchFrames(dates.start, dates.end));
		this.props.dispatch(fetchEmployees());
	}

	render() {
		if (this.props.loading){
			return (<div className="loader">Loading...</div>);
		}

		let error;
		if(this.props.error) {
			error = (
        <div className="error-msg" aria-live="polite">
          {this.props.error}
        </div>
			)
		}

		let frameList = this.props.frames;
		let listOfFramesToBeRendered = frameList;

		// if filter.employeeId is not equal to an empty string( if a filter exists )
		if (this.props.filter.employeeId !== '') {
			listOfFramesToBeRendered = frameList.filter(frame => {
				// if employeeId = open, filter by frames that have an employeeId of null
				if (this.props.filter.employeeId === 'open') {
					return frame.employeeId === null;
				}
				return (frame.employeeId && (frame.employeeId.id === this.props.filter.employeeId));
			});
		}

		// if filter.start is not an empty string
		if (this.props.filter.start !== '') {
			listOfFramesToBeRendered = listOfFramesToBeRendered.filter(frame => {
				return moment(frame.startFrame).format('YYYY-MM-DDTHH:mm') >= moment(this.props.filter.start).format('YYYY-MM-DDTHH:mm');
			});
		}

		// if filter.end is not an empty string
		if (this.props.filter.end !== '') {
			listOfFramesToBeRendered = listOfFramesToBeRendered.filter(frame => {
				return moment(frame.startFrame).format('YYYY-MM-DDTHH:mm') <= moment(this.props.filter.end).format('YYYY-MM-DDTHH:mm');
			});
		}

		return(
			<div className="dashboard-page">
				{error}
				<header className="dashboard-header">
					<h2>schedule</h2>
					<div className="dashboard-section-header">
						<button className="super-filter-btn" title="Filter" onClick={() => this.props.dispatch(showModal('superFilter', null))}>
							<i className="fa fa-filter" aria-hidden="true"></i>
						</button>
						<button className="frame-add-btn" title="Add a frame" onClick={() => this.props.dispatch(showModal('newFrame', null))}>
							<i className="fa fa-plus-circle" aria-hidden="true"></i>
						</button>
					</div>
				</header>
				<ScheduleView />
				<section className="dashboard-section">
					{listOfFramesToBeRendered.length
						? <CardList list={listOfFramesToBeRendered} />
						: <div className="no-schedule">No frames on the schedule</div>}
				</section>
			</div>
		);
	}
}

Dashboard.propTypes = {
	frames: PropTypes.array,
	error : PropTypes.string,
	loading: PropTypes.bool,
	dispatch: PropTypes.func,
	filter: PropTypes.object,
	view : PropTypes.string
};

const mapStateToProps = state => ({
	loggedIn : state.auth.user !== null,
	frames: state.frames.frames,
	loading : state.frames.loading,
	error : state.frames.error,
	filter: state.filter,
	view : state.frames.view
});

export default requiresLogin()(connect(mapStateToProps)(Dashboard));