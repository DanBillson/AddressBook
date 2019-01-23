import './ContactInfo.scss';
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getContact, deleteContact, updateContact } from '../../actions';
import ContactForm from '../../components/ContactForm/ContactForm';

class ContactInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { showForm: false };
    }

    toggleForm() {
        this.setState({ showForm: !this.state.showForm });
    }

    onSubmit = formValues => {
        this.props.updateContact(this.props.match.params.id, formValues);
    }

    renderContact = () => {
        if (!this.props.selectedContact) { return; }
        const { id } = this.props.match.params;

        return (
            <>
            <div className="contactInfo__controls">
                <p onClick={ this.toggleForm.bind(this) }>edit user</p>
                <p onClick={() => this.props.deleteContact(id)}>delete user</p>
            </div>
            <div className="contactInfo__info">
                <h1>{ this.props.selectedContact.name }</h1>
                <span>Address Line 1</span><p>{ this.props.selectedContact.address1 }</p>
                <span>Address Line 2</span><p>{ this.props.selectedContact.address2 }</p>
                <span>Town / City</span><p>{ this.props.selectedContact.town }</p>
                <span>County</span><p>{ this.props.selectedContact.county }</p>
                <span>Postcode</span><p>{ this.props.selectedContact.postcode }</p>
                <span>Telephone</span><p>{ this.props.selectedContact.phone }</p>
                <span>Email</span><p>{ this.props.selectedContact.email }</p>
            </div>
            { this.state.showForm ? <ContactForm 
                                        title="Edit contact" 
                                        onSubmit={ this.onSubmit } 
                                        closeForm={ this.toggleForm.bind(this) }
                                        initialValues={ _.pick(this.props.selectedContact, 'name', 'address1', 'address2', 'town', 'county', 'postcode', 'phone', 'email') }
                                    /> : null }
            </>
        );
    }

    render() {
        return (
            <div className="contactInfo">
                <div className="contactInfo__modal">
                    { this.renderContact() }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { selectedContact: state.contacts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { getContact, deleteContact, updateContact })(ContactInfo);