import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, focus } from 'redux-form';
import PropTypes from 'prop-types';
import renderField from './field';
import { addFrame } from '../../actions/edit-frame';
import { required } from './formValidators';

import '../../App.css';

class CreateShiftForm extends React.Component {

  handleSubmit = values => {
    const frame = {
      employeeId: (values.employee && (values.employee !== 'open')) ? values.employee : null,
      startFrame: values.startDate,
      endFrame: values.endDate
    };
    this.props.dispatch(addFrame(frame));
    this.props.onClose();
  };

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
        <div className="modal">
            <button className="modal-close-btn" onClick={this.props.onClose}>
            </button>
          <div className="add-shift-form-wrapper">
            {this.props.error}
            <h2>Add Shift</h2>
            <form
              className="add-shift-form"
              onSubmit={this.props.handleSubmit(this.handleSubmit)}
            >
              {error}
              <Field
                name="employee"
                label="Employee"
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
              <button className="form-submit-btn">Save</button>
            </form>
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

CreateShiftForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

CreateShiftForm = reduxForm({
  form: 'add-shift',
  onSubmitFail: (errors, dispatch) => dispatch(focus('add-shift', 'employee'))
})(CreateShiftForm);

export default CreateShiftForm = connect(state => {
  return {
    employees: state.employees.employees,
    error: state.employees.error
  };
})(CreateShiftForm);