import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import CardList from './card-list';
import AddShiftForm from './forms/create-shift-form';
import { fetchFrames } from '../actions/frames';
import requiresLogin from './requires-login';
import { getThisWeek, getToday } from '../actions/utils';
import {fetchEmployees} from '../actions/employee';
import PropTypes from 'prop-types';

import Filter from './filter';
import AdvancedFilter from './modals/advanced-filter-modal';

import './styles/dashboard.css';
import { showModal } from '../actions/modals';

export class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			addShiftOpen: false,
			advanFilter: false
		};
	}

	componentDidMount() {
		const dates = getThisWeek();
		this.props.dispatch(fetchFrames(dates.start, dates.end));
		this.props.dispatch(fetchEmployees());
	}

	toggleAdvancedFilter = () => {
		this.setState({
			advanFilter: !this.state.advanFilter
		});
	};

	render() {
		if (this.props.loading){
			return (<div>Loading...</div>);
		}

		const startSchedule = moment(getThisWeek().start).format('MMMM, DD');
		const endSchedule = moment(getThisWeek().end).format('MMMM, DD');
		const defaultTime = getToday().start;

		let frameList = this.props.frames;
		let listOfFramesToBeRendered = frameList;

		// Filtered array of frames that meet filter start and end range values
		let filteredFrames = frameList.filter(frame => {
			if(this.props.filter !== null) {
				let range = {
					start: this.props.filter.split('|')[0],
					end: this.props.filter.split('|')[1]
				}

				// if there is no employee assigned to a frame, it's open
				if ((range.start === 'open') || (range.end === 'open')) {
					return frame.employeeId === null;
				} 
				else if ((range.start === 'open') && (range.end)) {
					return ((frame.employeeId === null) && (frame.endFrame <= range.end))
				} 
				else if ((range.start) && (range.end === 'open')) {
					return ((frame.employeeId === null) && (frame.startFrame >= range.start))
				}

				// range.start - range.end, everything in between the range
				if (range.start && range.end) {
					return ((frame.startFrame >= range.start) && (frame.endFrame <= range.end));
				}
			}
		});

		if (this.props.filter === undefined || this.props.filter === 'null' || this.props.filter === null) {
			listOfFramesToBeRendered = frameList;
		} else if (this.props.filter !== null) {
			listOfFramesToBeRendered = filteredFrames;
		}

		return(
			<React.Fragment>
				<div className="dashboard">
					<button
						type="button"
						onClick={() => this.props.dispatch(showModal('newShift', null))}
					>
						<i className="fa fa-plus" aria-hidden="true"></i>
					</button>
					<div className="dashboard-section-header">
						<div>{startSchedule} - {endSchedule}</div>
						<Filter />
						<button className="advanFilter-btn" onClick={this.toggleAdvancedFilter}>Advanced Filter</button>
						<AdvancedFilter show={this.state.advanFilter} onClose={this.toggleAdvancedFilter} />
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
	filter: PropTypes.string
};

const mapStateToProps = state => ({
	loggedIn : state.auth.user !== null,
	frames: state.frames.frames,
	loading : state.frames.loading,
	error : state.frames.error,
	filter: state.filter.filter
});

export default requiresLogin()(connect(mapStateToProps)(Dashboard));