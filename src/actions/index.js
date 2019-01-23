import addressBook from '../apis/addressBook';
import postcodes from '../apis/postcodes';

// Create actions for CRUD operations

export const getContacts = () => async dispatch => {
    const { data } = await addressBook.get(`/contacts`);
    dispatch({ type: 'GET_CONTACTS', payload: data });
}

export const getContact = id => async dispatch => {
    const { data } = await addressBook.get(`/contacts/${id}`);
    dispatch({ type: 'GET_CONTACT', payload: data }); 
}

export const createContact = formValues => async dispatch => {
    const { data } = await addressBook.post(`/contacts`, formValues);
    dispatch({ type: 'CREATE_CONTACT', payload: data });
}

export const updateContact = (id, formValues) => async dispatch => {
    const { data } = await addressBook.patch(`/contacts/${id}`, formValues);
    dispatch({ type: 'UPDATE_CONTACT', payload: data });
}

export const deleteContact = id => async dispatch => {
    await addressBook.delete(`/contacts/${id}`);
    dispatch({ type: 'DELETE_CONTACT', payload: id });
}

export const getAddress = postcode => async dispatch => {
    const { data } = await postcodes.get(`/postcodes/${postcode}`);
    console.log(data);
    dispatch({ type: 'GET_ADDRESS', payload: data });
}

export const getPostcode = postcode => dispatch => {
    dispatch({ type: 'GET_POSTCODE', payload: postcode });
}