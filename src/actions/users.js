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
      const {message} = error;
      return Promise.reject( new SubmissionError({_error : message}));
    });
};