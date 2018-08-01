import React from 'react';
import './styles/employeeAvailability.css';


export class EmployeeAvailability extends React.Component {
  render() {
    return(
      <div className="employee-availability">
        <label htmlFor="monday">Monday
          <input type="checkbox" id="monday" name="monday"
            value="monday" />
        </label>
        
        <label htmlFor="tuesday">Tuesday
          <input type="checkbox" id="tuesday" name="tuesday"
            value="tuesday" />
        </label>

        <label htmlFor="wednesday">Wednesday
          <input type="checkbox" id="wednesday" name="wednesday"
            value="wednesday" />
        </label>

        <label htmlFor="thursday">Thursday
          <input type="checkbox" id="thursday" name="thursday"
            value="thursday" />
        </label>

        <label htmlFor="friday">Friday
          <input type="checkbox" id="friday" name="friday"
            value="friday" />
        </label>

        <label htmlFor="saturday">Saturday
          <input type="checkbox" id="saturday" name="saturday"
            value="saturday" />
        </label>

        <label htmlFor="sunday">Sunday
          <input type="checkbox" id="sunday" name="sunday"
            value="sunday" />
        </label>
      </div>
    );
  }
}

export default EmployeeAvailability;