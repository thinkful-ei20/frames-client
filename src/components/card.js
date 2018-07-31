import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';
import {showModal} from '../actions/modals';

import './styles/card.css';
import placeholder from '../images/placeholder_person.jpg';

export const Card = (props) => {

	const { frame } = props;
	const { employeeId, startFrame, endFrame, id } = frame;
	const emplName = (employeeId !== null) ? `${employeeId.firstname} ${employeeId.lastname}` : 'OPEN';
	let img = placeholder;
	//check that employee has loaded
	// THEN check that img is defined
	if(frame.employeeId){
		if(frame.employeeId.img){
			img = frame.employeeId.img;
		}
	}

	// format the moments to be just times
	const start = moment(startFrame).format('LT');
	const end = moment(endFrame).format('LT');

	const timeDiff = moment(endFrame).diff(moment(startFrame), 'hours');

	return(
		<article className="card">
			<div className="card-container">
				<div className="card-info">
					<div className="card-img"><img className="contain" src={img} alt={emplName}/></div>
					<div className="card-employee">
						<div className="card-name">{emplName}</div>
						<div className="card-frame">
							<p>{start} - {end}</p>
						</div>
					</div>
					<div className="card-time">
						<div className="card-time-diff">{`${timeDiff} ${timeDiff === 1 ? 'hr' : 'hrs'}`}</div>
					</div>
					<button className='opt-btn' title="Edit Frame" onClick={() => { props.dispatch(showModal('edit', id));}}>
						<i className="fa fa-ellipsis-h"></i>
					</button>
				</div>
			</div>
		</article>
	);

};

Card.propTypes = {
	frame : PropTypes.shape({
		employeeId: PropTypes.object,
		startFrame: PropTypes.string,
		endFrame: PropTypes.string,
		id: PropTypes.string
	}),
	dispatch: PropTypes.func
};

export default connect()(Card);