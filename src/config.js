console.log('the node environment is', process.env.NODE_ENV);

export const API_BASE_URL = process.env.NODE_ENV === 'production'
	? 'https://frames-server.herokuapp.com/api' : 'http://localhost:8080/api';