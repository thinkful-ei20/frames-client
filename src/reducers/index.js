import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth';
import framesReducer from './frames';

export default combineReducers({
	form: formReducer,
	auth : authReducer,
	frames : framesReducer
});