export const FILTER_SUCCESS = 'FILTER_SUCCESS';
export const filterSuccess = (employeeId, start, end) => ({
	type: FILTER_SUCCESS,
	employeeId,
	start,
	end
});
