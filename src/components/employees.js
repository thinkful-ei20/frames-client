import React from 'react';
import {connect} from 'react-redux';
import { fetchEmployees } from '../actions/employee';
import EmployeeCard from './employee-card';
import PropTypes from 'prop-types';

class Employees extends React.Component {

	componentDidMount(){
		this.props.dispatch(fetchEmployees());
	}

	render(){
		return (
			<React.Fragment>
				<header>
					<h1>Employees</h1>
				</header>
				<section>
					{this.props.employees.map(employee => {
						return (
							<EmployeeCard
								key={employee.id}
								name={`${employee.firstname} ${employee.lastname}`}
								email={employee.email}
								phoneNumber={employee.phoneNumber}
								id={employee.id}
							/>
						);
					})}
				</section>
			</React.Fragment>
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

export default connect(mapStateToProps)(Employees);