import { requestProfile, REQUEST_PROFILE, profileSuccess, PROFILE_SUCCESS, profileError, PROFILE_ERROR } from '../actions/profile';

describe('Profile Actions', () => {
	it('should return correct object with requestProfile', () => {
		const action=requestProfile();
		expect(action.type).toEqual(REQUEST_PROFILE);
	});

	it('should return correct object given profileSuccess', () => {
		const data = 'test data';
		const action = profileSuccess(data);
		expect(action.type).toEqual(PROFILE_SUCCESS);
		expect(action.data).toEqual(data);
	});

	it('should return correct object given profileError', () => {
		const error = 'test error';
		const action = profileError(error);
		expect(action.type).toEqual(PROFILE_ERROR);
		expect(action.error).toEqual(error);
	});
});