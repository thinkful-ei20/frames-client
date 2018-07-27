import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import CardList from './card-list';
import { fetchFrames } from '../actions/frames';
import requiresLogin from './requires-login';
import { getThisWeek } from '../actions/utils';
import { fetchEmployees } from '../actions/employee';
import PropTypes from 'prop-types';

import './styles/dashboard.css';
import { showModal } from '../actions/modals';

export class Dashboard extends React.Component {

	componentDidMount() {
		const dates = getThisWeek();
		this.props.dispatch(fetchFrames(dates.start, dates.end));
		this.props.dispatch(fetchEmployees());
	}

	render() {
		if (this.props.loading){
			return (<div>Loading...</div>);
		}

		let error = this.props.error ? this.props.error : undefined;

		const startSchedule = moment(getThisWeek().start).format('MMMM, DD');
		const endSchedule = moment(getThisWeek().end).format('MMMM, DD');

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
			<React.Fragment>
				<div className="dashboard">
					{error}
					<button className="super-filter-btn"
						onClick={() => this.props.dispatch(showModal('newShift', null))}
					>
						<i className="fa fa-plus" aria-hidden="true"></i>
					</button>
					<div className="dashboard-section-header">
						<div>{startSchedule} - {endSchedule}</div>
						<button className="super-filter-btn" onClick={() => this.props.dispatch(showModal('superFilter', null))}>Filter</button>
					</div>
					<section className="dashboard-section">
						{listOfFramesToBeRendered.length
							? <CardList list={listOfFramesToBeRendered} />
							: <div>No data</div>}
					</section>
				</div>
			</React.Fragment>
		);
	}
}

Dashboard.propTypes = {
	frames: PropTypes.array,
	error : PropTypes.string,
	loading: PropTypes.bool,
	dispatch: PropTypes.func,
	filter: PropTypes.object
};

const mapStateToProps = state => ({
	loggedIn : state.auth.user !== null,
	frames: state.frames.frames,
	loading : state.frames.loading,
	error : state.frames.error,
	filter: state.filter
});

export default requiresLogin()(connect(mapStateToProps)(Dashboard));