import React from 'react';

import './forms.css';

export const Field = props => {
  const Element = props.element || 'input';
  return (
    <div className="form-field" id={props.id}>
      <label htmlFor={props.input.name}>{props.label}</label>
      <Element
        // id={props.input.name}
        className={(props.meta.error && props.meta.touched) ? 'error-border' : 'placeholder-class'}
        type={props.type}
        value={props.value}
        aria-required="true"
        // placeholder={props.label}
        {...props.input}
      >
        {props.children}
      </Element>

      {/*
        If error evaluates to true -> show span element
        if error is undefined -> React ignores the span element
      */}
      {props.meta.error &&
      props.meta.touched &&
      <div className="form-field-error" aria-live="polite" role="alert">{props.meta.error}</div>}
    </div>
    // </React.Fragment>
  );
};

export default Field;