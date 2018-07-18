import React from 'react';
//import {connect} from 'react-redux';
//import PropTypes from 'prop-types';

import moment from 'moment';

//import requiresLogin from './requires-login';
import CardList from './card-list';

import './styles/dashboard.css';

export class Dashboard extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			employees:[]
		};
		this.getEmployees = this.getEmployees.bind(this);
	}

	componentDidMount() {
		/* Fetch List of Employees based on adminId */
		const employees = this.getEmployees();
		this.setState({employees});
	}

	getEmployees(state) {

		/* some api call to get employees can be used to map state to props,
		 * for now we can use this dummy data
		 *
		 * consider using moment.js plugin, 'moment-range' looks really usefull
		 */
		const start = moment();
		const end = start.clone().add(8, 'h');


		const iconUrl = 'https://cdn.iconscout.com/public/images/icon/free/png-128/github-logo-brand-development-tools-318f14f5797bb6cc-128x128.png';
		const fStart = start.format('ddd hA');
		const fEnd = end.format('ddd hA');

		console.log(fStart, fEnd);

		/* Used an array to emphasize that, maybe, each employee could have more than one 'frame',
		 * like multiple frames through out the day or week?
		 */
		return [
			{id:'000', name: 'Bobby', img: iconUrl, frame: [{start: fStart, end: fEnd }]},
			{id:'001', name:'Sally', img: iconUrl, frame: [{start: fStart, end: fEnd }]},
			{id:'002', name:'Jeff', img: iconUrl,frame: [{start: fStart, end: fEnd }]},
			{id:'003', name:'Linda', img: iconUrl, frame: [{start: fStart, end: fEnd }]},
			{id:'004', name:'Cookie', img: iconUrl, frame: [{start: fStart, end: fEnd }]},
			{id:'005', name:'Alex', img: iconUrl, frame: [{start: fStart, end: fEnd }]}
		];
	}

	render() {
		const {employees} = this.state;
		console.log(employees);
		return(
			<div className="dashboard">
				<h1>DashBoard!</h1>
				<CardList list={employees}/>
			</div>
		);
	}
}

/* Hook up our Reducer and make call to
 * initialize 'employees' prop with getEmployees()
 */

//const mapStateToProps = state => ({});

//Dashboard.PropTypes = {};

// export default requiresLogin()(connect()(Dashboard));

export default Dashboard;