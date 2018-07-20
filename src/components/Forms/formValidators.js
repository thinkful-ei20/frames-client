export const required = value => !value ? 'Required field' : undefined;

// If there is a value, check that it isn't jsut spaces
export const nonEmpty = value => {
	if(value) {
		return !value.trim()
			?
			'Field can\'t be blank'
			:
			undefined;
	}
};

// If there is a value, check that there are no trailing or beginning spaces
export const isTrimmed = value => {
	if(value) {
		return value.trim() !== value
			?
			'Cannot start or end with whitespace'
			:
			undefined;
	}
};

// Use regex to confirm the value looks like an email
export const validEmail = value =>
	!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
		? 'Please enter a valid email address'
		: undefined;

// Use regex to confirm the value looks like a phone number   
export const validPhone = value =>
	!/^\d{10}(?:\*55\d{0,4})?$/.test(value)
		? 'Please enter a valid phone number'
		: undefined;

// check length is as long and short as it should be
export const length = length => value => {
	if (length.min && value.length < length.min) {
		return `Must be at least ${length.min} characters long`;
	}
	if (length.max && value.length > length.max) {
		return `Must be at most ${length.max} characters long`;
	}
};

// check that the field matches another field
export const matches = field => (value, allValues) =>
	field in allValues && value.trim() === allValues[field].trim()
		? undefined
		: 'Does not match';