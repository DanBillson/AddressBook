import _ from 'lodash';

// Handle actions and update state

export default (state = {}, action) => {
    switch (action.type) {
        case 'GET_CONTACTS':
            return  { ...state, ..._.mapKeys(action.payload, 'id')};
        case 'GET_CONTACT':
            return { ...state, [action.payload.id]: action.payload };
        case 'CREATE_CONTACT':
            return { ...state, [action.payload.id]: action.payload };
        case 'UPDATE_CONTACT':
            return { ...state, [action.payload.id]: action.payload };
        case 'DELETE_CONTACT':
            return _.omit(state, action.payload);
        default:
            return state;
    }
}