export const REQUEST_EDIT_FRAME = 'REQUEST_EDIT_FRAME';
export const requestEditFrame = () => {
	return {
		type: REQUEST_EDIT_FRAME
	};
};

export const EDIT_FRAME_SUCCESS = 'EDIT_FRAME_SUCCESS';
export const editFrameSuccess = data => {
	return {
		type: EDIT_FRAME_SUCCESS,
		data
	};
};

export const EDIT_FRAME_ERROR = 'EDIT_FRAME_ERROR';
export const editFrameError = error => {
	return {
		type: EDIT_FRAME_ERROR,
		error
	};
};

