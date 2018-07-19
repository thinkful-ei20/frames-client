import React from 'react';
import PropTypes from 'prop-types';

import './styles/card.css';

// Each card is expecting: imageUrl, frameId, name, start , end 

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
		const {isOpen} = this.state;
		const chevron = isOpen? <i className="fa fa-angle-double-up"></i> : <i className="fa fa-angle-double-down"></i>;

		return(
			<li className="card">
				<div className="card-container">
					<div className="card-info">
						<div className="card-img"><img className="contain" src={imageUrl} alt={`${name}`}/></div>
						<div className="card-name">{name}</div>
						<div className="card-frame">{`${start} to ${end}`}</div>
						<button className={`opt-btn ${isOpen ? 'is-open' : ''}`} onClick={(e) => this.handleToggle(e)}>
							{chevron}
						</button>
					</div>
					<div className={`card-opt-panel ${isOpen ? 'is-open' : ''} `}>
						<div className='card-opt-panel-body'>
							<div className="card-opt">option 1</div>
							<div className="card-opt">option 2</div>
							<div className="card-opt">option 3</div>
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
	frame: PropTypes.shape({
		start: PropTypes.string,
		end: PropTypes.string
	})
};

export default Card;