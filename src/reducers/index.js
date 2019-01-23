import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import contactReducer from './contactReducer';
import postcodeReducer from './postcodeReducer';

export default combineReducers({
    contacts: contactReducer,
    form: formReducer,
    postcode: postcodeReducer
});