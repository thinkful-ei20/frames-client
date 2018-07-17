export const required = value => !value ? 'Required field' : undefined;

export const nonEmpty = value => {
  if(value) {
    return !value.trim()
      ?
      "Field can't be blank"
      :
      undefined;
  }
};

export const isTrimmed = value => {
  if(value) {
    return value.trim() !== value
      ?
      'Cannot start or end with whitespace'
      :
      undefined;
  }
};

export const validEmail = value =>
  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Please enter a valid email address'
    : undefined;

export const validPhone = value =>
  !/^\d{10}(?:\*55\d{0,4})?$/.test(value)
    ? 'Please enter a valid phone number'
    : undefined;

export const length = length => value => {
  if (length.min && value.length < length.min) {
    return `Must be at least ${length.min} characters long`;
  }
  if (length.max && value.length > length.max) {
    return `Must be at most ${length.max} characters long`;
  }
};

export const matches = field => (value, allValues) =>
  field in allValues && value.trim() === allValues[field].trim()
    ? undefined
    : 'Does not match';

// export const requireService = value => value === 'Pick a service' ? 'Required field' : undefined;