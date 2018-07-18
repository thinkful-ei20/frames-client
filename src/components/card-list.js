import React from 'react';
import PropTypes from 'prop-types';

import Card from './card';

import './styles/card-list.css';

export const CardList = (props) => {
	return(
		<ul className="card-list">
			{props.list.map(em => <Card imageUrl={em.img} name={em.name} key={em.id} frame={em.frame[0]}/>)}
		</ul>
	);
};

CardList.propTypes = {
	list: PropTypes.array
};

export default CardList;