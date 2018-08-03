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
    if (this.props.loading){
      return (<div className="loader">Loading...</div>);
    }

		let error;
		if(this.props.error) {
			error = (
				<div className="error-msg" aria-live="polite">
					{this.props.error}
				</div>
			);
		}

		return (
			<div className="employee-page">
				{error}
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
									img={employee.img}
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
		loading : state.employees.loading,
		employees : state.employees.employees,
		error : state.employees.error
	};
};

Employees.propTypes = {
	dispatch : PropTypes.func,
	employees : PropTypes.array,
  loading: PropTypes.bool,
  error : PropTypes.any
};

export default requiresLogin()(connect(mapStateToProps)(Employees));