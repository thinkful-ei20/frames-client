import React from 'react';
import { connect } from 'react-redux';
import CardList from './card-list';
import NavBar from './navBar';
import { fetchFrames } from '../actions/frames';
import requiresLogin from './requires-login';
import { getThisWeek } from '../actions/utils';
import {fetchEmployees} from '../actions/employee';
import PropTypes from 'prop-types';

import './styles/dashboard.css';

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
		if (this.props.error){
			return (<div>{this.props.error}</div>);
		}

		return(
			<div className="dashboard">
				<NavBar/>
				<h1>DashBoard!</h1>
				<div>July, 20</div>
				<div>
					<div>
						<div>Employee</div>
						<div>Shifts</div>
					</div>
					{this.props.frames.length
						?
						<CardList list={this.props.frames} />
						:
						<div>No data</div>
					}
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	frames: PropTypes.object,
	error : PropTypes.string,
	loading: PropTypes.bool,
	dispatch: PropTypes.func
};

const mapStateToProps = state => ({
	loggedIn : state.auth.user !== null,
	frames: state.frames.frames,
	loading : state.frames.loading,
	error : state.frames.error
});

export default requiresLogin()(connect(mapStateToProps)(Dashboard));