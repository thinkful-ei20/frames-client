import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';
import {showModal} from '../actions/modals';

import './styles/card.css';
import placeholder from '../images/placeholder_person.jpg';

class Card extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		};
	}

	handleToggle(e) {
		e.preventDefault();
		this.setState({isOpen: !this.state.isOpen});
	}

	render() {

		const { employeeId, startFrame, endFrame, id, key}  = this.props.employee;
			const emplName = `${employeeId.firstname} ${employeeId.lastname}`;

			const start = moment(startFrame).format('LT');
			const end = moment(endFrame).format('LT');
			console.log(moment(endFrame).diff(moment(startFrame), 'hours'));
			const timeDiff = moment(endFrame).diff(moment(startFrame), 'hours');

		const {isOpen} = this.state;
		const chevron = isOpen ? <i className="fa fa-angle-double-up"></i> : <i className="fa fa-angle-double-down"></i>;

		return(
			<article className="card" key={key}>
				<div className="card-container">
					<div className="card-info">
						<div className="card-img"><img className="contain" src={placeholder} alt={emplName}/></div>
						<div className="card-employee">
              <div className="card-name">{emplName}</div>
              <div className="card-frame">
                <p>{start} - {end}</p>
                {/*<p>to</p>*/}
                {/*<p>{endReadable}</p>*/}
              </div>
						</div>
						<div className="card-time">
              <div className="card-time-diff">{timeDiff} hr</div>

						</div>
						<button className={`opt-btn ${isOpen ? 'is-open' : ''}`} onClick={() => { this.props.dispatch(showModal('edit', id));}}>
							{chevron}
						</button>
					</div>
					<div className={`card-opt-panel ${isOpen ? 'is-open' : ''} `}>
						<div className='card-opt-panel-body'>
							<button className="card-opt" onClick={() => { this.props.dispatch(showModal('reassign', id));}}>Reassign</button>
							<button className="card-opt"onClick={() => { this.props.dispatch(showModal('edit', id));}}>Edit</button>
						</div>
					</div>
				</div>
			</article>
		);
	}
}

Card.propTypes = {
	imageUrl: PropTypes.string,
	name: PropTypes.string,
	dispatch : PropTypes.func,
	start : PropTypes.string,
	end : PropTypes.string,
	id : PropTypes.string
};

export default connect()(Card);