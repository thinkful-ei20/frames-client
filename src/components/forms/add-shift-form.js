import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, focus } from 'redux-form';
import PropTypes from 'prop-types';
import renderField from './field';
import { fetchEmployees } from '../../actions/employee';
import { addFrame } from '../../actions/edit-frame';
import { getToday } from '../../actions/utils';
import { required } from './formValidators';

import './styles/add-shift-form.css';

class AddShiftForm extends React.Component {
  componentDidMount() {
    // this.props.dispatch(fetchEmployees());
  }

  handleSubmit = values => {
    console.log(values);
    const frame = {
      employeeId: values.employee !== 'open' ? values.employee : null,
      startFrame: values.startDate,
      endFrame: values.endDate
    };
    this.props.dispatch(addFrame(frame));
  }

  ;

  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    // Alert user if unable to populate employees
    let error;
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }

    return (
      <div className="backdrop">
        <div className="add-shift-modal">
          <div className="add-shift-form-wrapper">
            <h2>Add Shift</h2>
            <form
              className="add-shift-form"
              onSubmit={this.props.handleSubmit(this.handleSubmit)}
            >
              {error}
              <Field
                name="employees"
                label="Employees"
                element="select"
                component={renderField}
              >
                <option key="a1" value="open">Open</option>
                {this.props.employees.map((e, i) =>
                  <option key={i} value={e.id}>{`${e.firstname} ${e.lastname}`}</option>
                )}
              </Field>
              <Field
                name="startDate"
                label="From"
                type="datetime-local"
                component={renderField}
                validate={[required]}
              />
              <Field
                name="endDate"
                label="To"
                type="datetime-local"
                component={renderField}
                validate={[required]}
              />
              <button type="submit">Save</button>
            </form>
          </div>
          {this.props.children}
          <div className="footer">
            <button onClick={this.props.onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

AddShiftForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

AddShiftForm = reduxForm({
  form: 'add-shift',
  onSubmitFail: (errors, dispatch) => dispatch(focus('', ''))
})(AddShiftForm);

export default AddShiftForm = connect(state => {
  return {
    employees: state.employees.employees,
    error: state.employees.error
  };
})(AddShiftForm);