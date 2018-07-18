import {SubmissionError} from 'redux-form';

import { login } from './auth';
import {API_BASE_URL} from '../config';
import { normalizeResponseErrors } from './utils';

export const createUser = user => dispatch => {
  return fetch(`${API_BASE_URL}/admin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => {
      res.json();
      dispatch(login(user.username, user.password));
    })
    .catch(error => {
      console.log('CATCH BLOCK', error);
      const {reason, message, location} = error;
      return Promise.reject( new SubmissionError({_error : message}));
      // if (reason === 'ValidationError'){
        // return Promise.reject(new SubmissionError({
        //   [location] : message
        // }));
      // }
    });
};