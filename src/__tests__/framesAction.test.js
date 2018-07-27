import { requestFrames, REQUEST_FRAMES, framesSuccess, FRAMES_SUCCESS, framesError, FRAMES_ERROR } from '../actions/frames';

describe('Frames Actions', () => {
	it('request frames should return the correct object',() => {
		const action = requestFrames();
		expect(action.type).toEqual(REQUEST_FRAMES);
	});

	it('frames success should return the correct object', () => {
		const data = 'test data';
		const action = framesSuccess(data);
		expect(action.type).toEqual(FRAMES_SUCCESS);
		expect(action.data).toEqual(data);
	});

	it('frames error should return the correct object', () => {
		const error = 'test error';
		const action = framesError(error);
		expect(action.type).toEqual(FRAMES_ERROR);
		expect(action.error).toEqual(error);
	});
});
