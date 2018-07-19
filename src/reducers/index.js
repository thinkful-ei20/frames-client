import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './auth';
import profileReducer from './profile';
import modalReducer from './modals';
import framesReducer from './frames';

export default combineReducers({
	form: formReducer,
	auth : authReducer,
	profile : profileReducer
	modal : modalReducer,
	frames : framesReducer
});