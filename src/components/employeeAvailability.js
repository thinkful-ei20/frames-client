import React from 'react';
import './styles/employeeAvailability.css';
import '../index.css';

export class EmployeeAvailability extends React.Component {

	toggleHidden(ids){
		ids.forEach(id => {
			document.getElementById(id).classList.toggle('hidden');
		});
	}

	render() {
		const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
		const dayofWeekInput = daysOfWeek.map(weekday => {
			const dayAvailability = this.props.availability.find(item => item.day === weekday);

			return (
				<label
					key={weekday}
					htmlFor={weekday}>{weekday}
					<div>
						<input type="checkbox" id={weekday} name={weekday}
							value={weekday}
							onChange={() => this.toggleHidden([`${weekday}-start`, `${weekday}-end`])}
							defaultChecked={dayAvailability}/>
						<input
							className="hidden"
							type="time"
							id={`${weekday}-start`}
							name={`${weekday}-start`}
							defaultValue={dayAvailability ? dayAvailability.start : null}
						/>
						<input 
							className="hidden" 
							type="time"
							id={`${weekday}-end`} 
							name={`${weekday}-end`}
							defaultValue={dayAvailability ? dayAvailability.end : null}
						/>
					</div>
				</label>
			);
		});

		return(
			<div className="employee-availability">
				<fieldset>
					<legend>Select Days/Hours of Employee Availability</legend>
					{dayofWeekInput}
				</fieldset>
			</div>
		);
	}
}

export default EmployeeAvailability;