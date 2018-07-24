import React from 'react';
import {connect} from 'react-redux';
import { showModal } from '../actions/modals';
import PropTypes from 'prop-types';

function EmployeeCard (props){
	return (
		<div>
			<h2>{props.name}</h2>
			<p>{props.email}</p>
			<p>{props.phoneNumber}</p>
			<button onClick={() => props.dispatch(showModal('employee', props.id))}>
				<i className="fa fa-ellipsis-h"></i>
			</button>
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