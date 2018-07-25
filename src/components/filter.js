import React from 'react';
import { connect } from 'react-redux';
import { filterSuccess } from '../actions/filter';
// import './styles/filter.css';
import PropTypes from 'prop-types';

export class Filter extends React.Component {
	filterByTimeFrame(e) {
		console.log(e.target.value);
		this.props.dispatch(filterSuccess(e.target.value));
	}

	render() {
		return (
			<div className="filter">
				<select htmlFor="filterByTime" onChange={(e) => this.filterByTimeFrame(e)}>
					<option value='null'>FILTER TIME FRAMES</option>
					<option value="open">OPEN</option>
					{this.props.frames.map((frame, i) => {
						return <option key={i} value={`${frame.startFrame}|${frame.endFrame}`}>{frame.startFrame} - {frame.endFrame}</option>;
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