export const RESET_FILTER_STATE = 'RESET_FILTER_STATE';
export const resetFilterState = () => ({
	type: RESET_FILTER_STATE
});

export const FILTER_SUCCESS = 'FILTER_SUCCESS';
export const filterSuccess = (employeeId, start, end) => ({
	type: FILTER_SUCCESS,
	employeeId,
	start,
	end
});
