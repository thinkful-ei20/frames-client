import React from 'react';
import PropTypes from 'prop-types';

import Card from './card';

import './styles/card-list.css';

export const CardList = (props) => {
	return(
		<ul className="card-list">
			{props.list.map((em,index) =>
				<Card
					imageUrl={'fake.img'}
					name={`${em.employeeId.firstname} ${em.employeeId.lastname}`}
					key={index}
					id={em.id}
					start={em.startFrame}
					end={em.endFrame}/>)}
		</ul>
	);
};

CardList.propTypes = {
	list: PropTypes.array
};

export default CardList;