import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Card from './card';

import './styles/card-list.css';

export const CardList = (props) => {
	let dayWrapper = 0;
	return(
		<section className="card-list">
			{props.list.map((em, index) => {

				let currDayValue = moment(em.startFrame.slice(0, 10)).valueOf();
				let currDay = moment(em.startFrame).format('dddd, MMM, DD');

				if (currDayValue > dayWrapper) {
					dayWrapper = currDayValue;
        	return (
						<React.Fragment>
							<p className="card-date">{currDay}</p>
							<Card
								key={index}
								employee={em}
							/>
						</React.Fragment>
					);
				}
        	return (
					<Card
						// imageUrl={'fake.img'}
						// name={`${em.employeeId.firstname} ${em.employeeId.lastname}`}
						key={index}
						employee={em}
						// id={em.id}
						// start={em.startFrame}
						// end={em.endFrame}
					/>
				);

			})
			}
		</section>
	);
};

CardList.propTypes = {
	list: PropTypes.array
};

export default CardList;