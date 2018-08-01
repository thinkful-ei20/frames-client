import { requestEditFrame, REQUEST_EDIT_FRAME, editFrameError, EDIT_FRAME_ERROR } from '../actions/frame';

describe('Edit Frame actions', () => {

	describe('REQUEST_EDIT_FRAME', () => {
		it('should return the correct object', () => {
			const action = requestEditFrame();
			expect(action.type).toEqual(REQUEST_EDIT_FRAME);
		});
	});

	describe('EDIT_FRAME_ERROR', () => {
		it('should return the correct object', () => {
			const error = 'test error';
			const action = editFrameError(error);
			expect(action.type).toEqual(EDIT_FRAME_ERROR);
			expect(action.error).toEqual(error);
		});
	});
});