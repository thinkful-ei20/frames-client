import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import EmployeeCard from './employee-card';
import requiresLogin from './requires-login';

import { showModal } from '../actions/modals';
import { fetchEmployees } from '../actions/employee';

import './styles/employees.css';

export class Employees extends React.Component {

	componentDidMount(){
		this.props.dispatch(fetchEmployees());
	}

	render(){

		return (
			<div className="employee-page">
				<header className="employee-header">
					<h2>Employees</h2>
					<div>
						<button
							className="employee-add-btn"
							title="Add an Employee"
							type="button"
							onClick={() => this.props.dispatch(showModal('newEmployee', null))}>
							<i className="fa fa-plus-circle" aria-hidden="true"></i>
						</button>
					</div>
				</header>
				<section className="employee-section">
					{(this.props.employees.length)
						? this.props.employees.map(employee => {
							return (
								<EmployeeCard
									key={employee.id}
									name={`${employee.firstname} ${employee.lastname}`}
									email={employee.email}
									phoneNumber={employee.phoneNumber}
									id={employee.id}
									availability={employee.availability}
								/>
							);
						})
						: <div className="no-employees">No employees to schedule</div>}
				</section>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		employees : state.employees.employees
	};
};

Employees.propTypes = {
	dispatch : PropTypes.func,
	employees : PropTypes.array
};

export default requiresLogin()(connect(mapStateToProps)(Employees));