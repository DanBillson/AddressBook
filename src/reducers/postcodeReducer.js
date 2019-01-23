export default (state = {}, action) => {
    switch (action.type) {
        case 'GET_ADDRESS':
            return  { ...state, address: action.payload };
        case 'GET_POSTCODE':
            return { ...state, postcode: action.payload };
        default:
            return state;
    }
}