

import React from 'react';
import { connect } from 'react-redux';

import { filterSuccess } from '../actions/filter';
import './styles/filter.css';

export class Filter extends React.Component {
	filterByTimeFrame(e) {
		this.props.dispatch(filterSuccess(e.target.value));
	}

	render() {
		return (
			<div className="filter">
				<select htmlFor="filterByTime" onChange={(e) => this.filterByTimeFrame(e)}>
					<option>FILTER TIME FRAMES</option>
					<option value="open">OPEN</option>
					{this.props.frames.frames.map((frame, i) => {
						return <option key={i} value={`${frame.startFrame} - ${frame.endFrame}`}>{frame.startFrame} - {frame.endFrame}</option>;
					})}
				</select>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	frames: state.frames
});

export default connect(mapStateToProps)(Filter);