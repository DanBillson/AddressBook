import './ContactList.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ContactForm from '../ContactForm/ContactForm';
import { getContacts, createContact } from '../../actions';
import { ReactComponent as Arrow } from '../../assets/images/arrow.svg'

class ContactList extends Component {
    constructor(props) {
        super(props);
        this.state = { showForm: false, showList: true };
    }

    // fetch all contacts
    componentDidMount() {
        this.props.getContacts();
    }

    // flip the state to show or hide components
    toggleForm = () => {
        this.setState({ showForm: !this.state.showForm });
    }

    toggleContacts = () => {
        this.setState({ showList: !this.state.showList });
    }

    // pass onSubmit function to form
    onSubmit = formValues => {
        this.props.createContact(formValues);
    }

    // render a list item for each user
    renderContacts = () => {
        return this.props.contacts.map(contact => {
            return <li className="contactList__contact" key={ contact.id }>
                <Link to={`/${ contact.id }`}>{ contact.name }</Link>
            </li>;
        })
    }

    render() {
        return (
            <>
                <Arrow className={ this.state.showList ? 'arrow show' : 'arrow' } onClick={ this.toggleContacts }/>
                <div className={ this.state.showList ? 'contactList show' : 'contactList' }>
                    <div className="contactList__header">
                        <h2>Contacts</h2>
                    </div>
                    <div className="contactList__body">
                        <ul className="contactList__list">
                            { this.renderContacts() }
                        </ul>
                    </div>
                    <div className="contactList__footer">
                        <h2 onClick={ this.toggleForm.bind(this) }>Add new +</h2>
                    </div>
                    { this.state.showForm ? <ContactForm 
                                                title="Add new contact" 
                                                onSubmit={ this.onSubmit } 
                                                closeForm={ this.toggleForm.bind(this) }
                                                initalValues={{ 'name': 'Jimmy' }}
                                            /> : null }
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return { 
        contacts: Object.values(state.contacts),
        postcode: state.postcode.postcode ,
        address: state.postcode.address
    }
}

export default connect(mapStateToProps, { getContacts, createContact })(ContactList);