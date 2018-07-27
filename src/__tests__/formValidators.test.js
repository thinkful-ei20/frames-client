import { required, isTrimmed, validEmail, validPhone, length } from '../components/Forms/formValidators';

describe.only('Validators', () => {
	it('should return undefined if required and value defined', () => {
		const value= 'test';
		const result = required(value);
		expect(result).toEqual(undefined);
	});

	it('Should return a message if required and value not defined', () => {
		let value;
		const result = required(value);
		expect(result).toEqual('Required field');
	});

	it('Should return undefined if value is trimemd', () => {
		let value = 'test';
		const result = isTrimmed(value);
		expect(result).toEqual(undefined);
	});

	it('Should return message if value is not trimmed', () => {
		let value = ' test ';
		const result = isTrimmed(value);
		expect(result).toEqual('Cannot start or end with whitespace');
	});

	it('Should return undefined if value is valid email', () => {
		let value = 'me@myexample.com';
		const result = validEmail(value);
		expect(result).toEqual(undefined);
	});

	it('Should return a message if value is not a valid email', () => {
		let value= 'notanemail';
		const result = validEmail(value);
		expect(result).toEqual('Invalid email');
	});

	it('Should return undefined if value is valid phone number', () => {
		let value = '9701231234';
		const result = validPhone(value);
		expect(result).toEqual(undefined);
	});

	it('Should return a message if value is not a valid phone number', () => {
		let value = 'notaphonenum';
		const result = validPhone(value);
		expect(result).toEqual('Invalid phone number');
	});

});