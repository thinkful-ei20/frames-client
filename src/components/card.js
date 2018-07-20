import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {showModal} from '../actions/modals';

import './styles/card.css';

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

		const {imageUrl, name, start, end, id}  = this.props;
		const startReadable = new Date(start).toUTCString();
		const endReadable = new Date(end).toUTCString();

		const {isOpen} = this.state;
		const chevron = isOpen ? <i className="fa fa-angle-double-up"></i> : <i className="fa fa-angle-double-down"></i>;

		return(
			<li className="card">
				<div className="card-container">
					<div className="card-info">
						<div className="card-img"><img className="contain" src={imageUrl} alt={`${name}`}/></div>
						<div className="card-name">{name}</div>
						<div className="card-frame">
							<p>{startReadable}</p>
							<p>to</p>
							<p>{endReadable}</p>
						</div>
						<button className={`opt-btn ${isOpen ? 'is-open' : ''}`} onClick={(e) => this.handleToggle(e)}>
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
			</li>
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