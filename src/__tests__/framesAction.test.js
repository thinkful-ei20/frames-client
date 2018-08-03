import {
	requestFrames,
	REQUEST_FRAMES,
	framesSuccess,
	FRAMES_SUCCESS,
	framesError,
	FRAMES_ERROR,
	fetchFrames,
	editFrame,
	addFrame,
	deleteFrame
} from '../actions/frames';

import { API_BASE_URL } from '../config';

describe('Frames Actions', () => {

	describe('Synchronous', () => {
		it('requestFrames() should return the correct object',() => {
			const action = requestFrames();
			expect(action.type).toEqual(REQUEST_FRAMES);
		});

		it('framesSuccess() should return the correct object', () => {
			const data = 'test data';
			const action = framesSuccess(data);
			expect(action.type).toEqual(FRAMES_SUCCESS);
			expect(action.data).toEqual(data);
		});

		it('framesError() should return the correct object', () => {
			const error = 'test error';
			const action = framesError(error);
			expect(action.type).toEqual(FRAMES_ERROR);
			expect(action.error).toEqual(error);
		});
	});

	describe('Asynchronous', () => {
		let dispatch;
		const data = 'test';
		const token = '1234567';

		describe('On Success',() => {

			beforeEach(() => {
				fetch.resetMocks();
			});

			afterEach(() => {
				localStorage.clear();
			});

			it('fetchFrames() should dispatch framesSuccess()', () => {
				const start = 'start';
				const end = 'end';
				const url = `${API_BASE_URL}/frames/?startDate=${start}&endDate=${end}`;
				const body = {'headers': {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'}, 'method': 'GET'};

				localStorage.setItem('authToken', token);
				fetch.mockResponse(JSON.stringify(data));
				dispatch = jest.fn();

				return fetchFrames(start, end)(dispatch).then(() => {
					expect(fetch).toHaveBeenCalledWith(url, body);
					expect(dispatch).toHaveBeenCalledWith(framesSuccess(data));
				});
			});

			// it('editFrame() should dispatch fetchFrames()', () => {

			// 	const frameId = '000';
			// 	const updatedFrame = {};

			// 	dispatch = jest.fn();


			// 	return editFrame(frameId, updatedFrame)(dispatch).then(() => {
			// 		expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/frames/frame/${frameId}`);
			// 		expect(dispatch).toHaveBeenCalledWith(framesSuccess(data));
			// 	});
			// });

			// it('addFrame() should dispatch framesSucces()', () => {

			// 	var fetch = jest.fn().mockImplementation(() =>
			// 		Promise.resolve({
			// 			ok: true,
			// 			json() {
			// 				return data;
			// 			}
			// 		})
			// 	);

			// 	dispatch = jest.fn();
			// 	const frame = {};
			// 	return addFrame(frame)(dispatch).then(() => {
			// 		expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/frames/frame`);
			// 		expect(dispatch).toHaveBeenCalledWith(framesSuccess(data));
			// 	});
			// });

			// it('deleteFrame() should dispatch framesSucces()', () => {

			// 	var fetch = jest.fn().mockImplementation(() =>
			// 		Promise.resolve({
			// 			ok: true,
			// 			json() {
			// 				return data;
			// 			}
			// 		})
			// 	);

			// 	dispatch = jest.fn();
			// 	const frameId = '000';

			// 	return deleteFrame(frameId)(dispatch).then(() => {
			// 		expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/frames/frame/${frameId}`);
			// 		expect(dispatch).toHaveBeenCalledWith(framesSuccess(data));
			// 	});
			// });
		});
	});
});
