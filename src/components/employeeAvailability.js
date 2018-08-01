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
		return(
			<div className="employee-availability">
				<fieldset>
					<legend>Select Days/Hours of Employee Availability</legend>
					<label htmlFor="monday">Monday
						<div>
							<input type="checkbox" id="monday" name="monday"
								value="monday" onChange={() => this.toggleHidden(['monday-start', 'monday-end'])}/>
							<input className="hidden" type="time" id="monday-start" name="monday-start" />
							<input className="hidden" type="time" id="monday-end" name="monday-end" />
						</div>
					</label>

					<label htmlFor="tuesday">Tuesday
						<div>
							<input type="checkbox" id="tuesday" name="tuesday"
								value="tuesday" onChange={() => this.toggleHidden(['tuesday-start', 'tuesday-end'])} />
							<input className="hidden" type="time" id="tuesday-start" name="tuesday-start" />
							<input className="hidden" type="time" id="tuesday-end" name="tuesday-end" />
						</div>
					</label>

					<label htmlFor="wednesday">Wednesday
						<div>
							<input type="checkbox" id="wednesday" name="wednesday"
								value="wednesday" onChange={() => this.toggleHidden(['wednesday-start', 'wednesday-end'])} />
							<input className="hidden" type="time" id="wednesday-start" name="wednesday-start" />
							<input className="hidden" type="time" id="wednesday-end" name="wednesday-end" />
						</div>
					</label>

					<label htmlFor="thursday">Thursday
						<div>
							<input type="checkbox" id="thursday" name="thursday"
								value="thursday" onChange={() => this.toggleHidden(['thursday-start', 'thursday-end'])} />
							<input className="hidden" type="time" id="thursday-start" name="thursday-start" />
							<input className="hidden" type="time" id="thursday-end" name="thursday-end" />
						</div>
					</label>

					<label htmlFor="friday">Friday
						<div>
							<input type="checkbox" id="friday" name="friday"
								value="friday" onChange={() => this.toggleHidden(['friday-start', 'friday-end'])} />
							<input className="hidden" type="time" id="friday-start" name="friday-start" />
							<input className="hidden" type="time" id="friday-end" name="friday-end" />
						</div>
					</label>

					<label htmlFor="saturday">Saturday
						<div>
							<input type="checkbox" id="saturday" name="saturday"
								value="saturday" onChange={() => this.toggleHidden(['saturday-start', 'saturday-end'])} />
							<input className="hidden" type="time" id="saturday-start" name="saturday-start" />
							<input className="hidden" type="time" id="saturday-end" name="saturday-end" />
						</div>
					</label>

					<label htmlFor="sunday">Sunday
						<div>
							<input type="checkbox" id="sunday" name="sunday"
								value="sunday" onChange={() => this.toggleHidden(['sunday-start', 'sunday-end'])} />
							<input className="hidden" type="time" id="sunday-start" name="sunday-start" />
							<input className="hidden" type="time" id="sunday-end" name="sunday-end" />
						</div>
					</label>
				</fieldset>
			</div>
		);
	}
}

export default EmployeeAvailability;