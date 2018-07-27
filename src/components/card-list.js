import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Card from './card';

import './styles/card-list.css';

export const CardList = (props) => {
	let dayWrapper = 0;
	return(
		<section className="card-list">
			{props.list.map((frame, index) => {
				let currDayValue = moment(frame.startFrame.slice(0, 10)).valueOf();
				let currDay = moment(frame.startFrame).format('dddd, MMM, DD');

				if (currDayValue > dayWrapper) {
					dayWrapper = currDayValue;
					return (
						<React.Fragment key={index}>
							<p className="card-date">{currDay}</p>
							<Card
								frame={frame}
							/>
						</React.Fragment>
					);
				}
				return (
					<React.Fragment key={index}>
						<Card
							frame={frame}
						/>
					</React.Fragment>
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