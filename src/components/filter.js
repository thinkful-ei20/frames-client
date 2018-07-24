

import React from 'react';
import { connect } from 'react-redux';

import { requestFilter, filterSuccess } from '../actions/filter';
import './styles/filter.css';

export class Filter extends React.Component {
	filterByTimeFrame(e) {
		// this.props.dispatch(filterSuccess(e.target.value));
		console.log(this.state);
	}

	render() {
		return (
			<div className="filter">
				<span>Filter by Time Frame:</span>
				<select htmlFor="filterByTime" onChange={(e) => this.filterByTimeFrame(e)}>
					<option>SELECT TIME FRAME</option>
					{this.props.frames.frames.map((frame, i) => <option key={i}>{frame.startFrame} - {frame.endFrame}</option>)}
					<option value="open">OPEN</option>
				</select>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	frames: state.frames
});

export default connect(mapStateToProps)(Filter);