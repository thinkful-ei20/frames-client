import React from 'react';
import {connect} from 'react-redux';
import { fetchEmployees } from '../actions/employee';
import EmployeeCard from './employee-card';
import PropTypes from 'prop-types';
import { showModal } from '../actions/modals';
import requiresLogin from './requires-login';

import './styles/employees.css';

class Employees extends React.Component {

	componentDidMount(){
		this.props.dispatch(fetchEmployees());
	}

	render(){


		return (
			<main className="employees-wrapper">
				<header className="employee-header">
					<h2>Employees</h2>
					<div>
						<button className="employee-add-btn" onClick={() => this.props.dispatch(showModal('newEmployee', null))}>
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
								/>
							);
						})
						: <div>No data</div>}
				</section>
			</main>
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