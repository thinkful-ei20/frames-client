import React from 'react';
import { connect } from 'react-redux';
import { filterSuccess } from '../actions/filter';
import './styles/filter.css';
import PropTypes from 'prop-types';
import moment from 'moment';

export class Filter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filter: null
		};
	}

	filterByTimeFrame(e) {
		let filter = e.target.value;
		this.props.dispatch(filterSuccess(filter));
		console.log(`non-advanced-filter: ${filter}`);
		this.setState({
			filter: null
		});
	}

	removeDuplicates = (arr) => {
		let uniqueArray = [];
		for (let i = 0; i < arr.length; i++) {
			if (uniqueArray.indexOf(arr[i]) === -1 && arr[i] !== undefined) {
				uniqueArray.push(arr[i]);
			}
		}
		return uniqueArray;
	}

	render() {
		return (
			<div className="filter">
				<select htmlFor="filterByTime" onChange={(e) => this.filterByTimeFrame(e)}>
					<option value='null'>FILTER TIME FRAMES</option>
					<option value='open'>OPEN</option>
					{this.removeDuplicates(this.props.frames).map((frame, i) => {
						return (
							<option
								key={i}
								value={`${moment(frame.startFrame).format('LT')}|${moment(frame.endFrame).format('LT')}`}
							>
								{moment(frame.startFrame).format('LT')} - {moment(frame.endFrame).format('LT')}
							</option>
						);
					})}
				</select>
			</div>
		);
	}
}

Filter.propTypes = {
	frames: PropTypes.array,
	error : PropTypes.string,
	loading: PropTypes.bool,
	dispatch: PropTypes.func
};

const mapStateToProps = state => ({
	frames: state.frames.frames
});

export default connect(mapStateToProps)(Filter);