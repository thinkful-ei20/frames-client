import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';

export const createUser = user => dispatch => {
  return fetch(`${API_BASE_URL}/admin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .catch(error => {
      const {reason, message, location} = error;
      if (reason === 'ValidationError'){
        return Promise.reject(new SubmissionError({
          [location] : message
        }));
      }
    });
};