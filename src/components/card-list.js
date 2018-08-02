import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Card from './card';

import './styles/card-list.css';

export const CardList = (props) => {
	let prevDayValue = 0;
	return(
		<section className="card-list">
			{props.list.map((frame, index) => {
				// convert UTC to local time
				let localTime = moment(frame.startFrame).format();
				// get number of milliseconds of the startFrame date
				let currDayValue = moment(localTime.slice(0, 10)).valueOf();
				// compare start date of the iterated frame to the start date of the previous frame
				if (currDayValue > prevDayValue) {
					prevDayValue = currDayValue;
					return (
						<React.Fragment key={index}>
							<div className="card-date-wrapper"><p className="card-date">{moment(localTime).format('dddd, MMMM Do')}</p></div>
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