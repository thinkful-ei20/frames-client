import React from 'react';
import {connect} from 'react-redux';
import { showModal } from '../actions/modals';
import PropTypes from 'prop-types';

function EmployeeCard (props){
	return (
		<div className="employee-section-details">
			<div>
				<h3>{props.name}</h3>
				<p>{props.email}</p>
				<p>{props.phoneNumber}</p>
			</div>
			<div>
				<button className="opt-btn" onClick={() => props.dispatch(showModal('employee', props.id))}>
					<i className="fa fa-address-card" aria-hidden="true"></i>
				</button>
			</div>

		</div>
	);
}

EmployeeCard.propTypes = {
	name : PropTypes.string,
	email : PropTypes.string,
	phoneNumber : PropTypes.number,
	dispatch : PropTypes.func,
	id : PropTypes.string
};

export default connect()(EmployeeCard);