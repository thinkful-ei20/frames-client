import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import CardList from './card-list';
import AddShiftForm from './forms/create-shift-form';
import { fetchFrames } from '../actions/frames';
import requiresLogin from './requires-login';
import { getThisWeek, getToday } from '../actions/utils';
import { fetchEmployees } from '../actions/employee';
import PropTypes from 'prop-types';

import Filter from './filter';
import AdvancedFilter from './modals/advanced-filter-modal';

import './styles/dashboard.css';
import { showModal } from '../actions/modals';
import { resetFilterState } from '../actions/filter';

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
			// if there is a filter
			if(this.props.filter !== null) {
				let range;

				// filter
				if (this.props.filter === 'open') {
					range = 'open';
				}

				// filter (Any filter coming out of filter will be length(2))
				if (this.props.filter.split('|').length === 2) {
					range = {
						start: this.props.filter.split('|')[0],
						end: this.props.filter.split('|')[1]
					}
				}

				// advanced-filter (Any filter coming out of advanced-filter will be length(3))
				// if the split filter.length is 3, then there should be a day, as well as a start and end 
				if (this.props.filter.split('|').length === 3) {
					range = {
						start: this.props.filter.split('|')[0],
						end: this.props.filter.split('|')[1],
						day: this.props.filter.split('|')[2]
					}
				}	
				console.log(`RANGE: ${JSON.stringify(range, null, 2)}`);

				// if start or end is undefined, return all frames
				if (range === undefined) {
					return frame;
				}
				// if the filter range = 'open', return all open shifts
				if (range === 'open') {
					return frame.employeeId === null;
				}
				// if there is no employee assigned to a frame, it's open
				if ((range.start === 'open') || (range.end === 'open')) {
					return frame.employeeId === null;
				} 
				// if range.start = 'open' and range.end != null, return all open frames, and all frames less than the end
				if ((range.start === 'open') && (range.end)) {
					return ((frame.employeeId === null) && (moment(frame.endFrame).format('LT') <= range.end))
				} 
				// if range.start != null and range.end = 'open, return all open frames, and all frames greater than the the start
				if ((range.start) && (range.end === 'open')) {
					return ((frame.employeeId === null) && (moment(frame.startFrame).format('LT') >= range.start))
				}
				// range.start - range.end, everything in between the range
				if (range.start && range.end) {
					return ((moment(frame.startFrame).format('LT') >= range.start) && (moment(frame.endFrame).format('LT') <= range.end));
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
						<button className="advanFilter-btn" onClick={() => {
							this.props.dispatch(resetFilterState());
							this.toggleAdvancedFilter()
							}}>Advanced Filter</button>
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