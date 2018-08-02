import moment from 'moment';

// Boilerplate code for handling errors from the API.  If the error response
// contains JSON then we return a rejected promise containing the decoded
// JSON.  If the error doesn't contain JSON then we return a rejected promise
// containing the status text.  If there is no error then we continue with
// the promise chain.
export const normalizeResponseErrors = res => {
	if (!res.ok) {
		if (
			res.headers.has('content-type') &&
      res.headers.get('content-type').startsWith('application/json')
		) {
			// It's a nice JSON error returned by us, so decode it
			return res.json().then(err => {
				return Promise.reject(err);
			});
		}
		// It's a less informative error returned by express
		return Promise.reject({
			code: res.status,
			message: res.statusText
		});
	}
	return res;
};

// Return an object with start and end 24 hours apart
export const getToday = () => {
	const start = moment().startOf('day').format();
	const end = moment().endOf('day').format();
	return {
		start,
		end
	};
};

// Return and object with start and end 7 days apart
export const getThisWeek = () => {
	const start = moment().startOf('day').format();
	const end = moment().startOf('day').add(7, 'days').format();
	return {
		start,
		end
	};
};

// Return an object with start and end 28 days apart
export const getThisMonth = () => {
	const start = moment().startOf('day').format();
	const end = moment().startOf('day').add(1, 'months').format();
	return {
		start,
		end
	};
};

export const formatTwelveHourTime = (time) => {
	// Assumes time variable is a string like so - '13:00' or '03:00'
	if (Number.parseInt(time, 10) > 12){
		const hours = Number.parseInt(time, 10) -12;
		const minutes = time.slice(2, 5);
		return  `${hours}${minutes} PM`;
	}
	return `${time} AM`;
};