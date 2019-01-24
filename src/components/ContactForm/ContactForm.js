import './ContactForm.scss';
import React, { Component } from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { connect } from 'react-redux';
import { getPostcode, getAddress } from '../../actions';

class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = { postcodeCheck: '' };
    }

    populateFields = () => {
        if (!this.props.address[1]) { return; }
        console.log(this.props.address[1].result);
        this.props.dispatch(change('contactForm', 'address2', this.props.address[1].result.parish));
        this.props.dispatch(change('contactForm', 'town', this.props.address[1].result.admin_district));
        this.props.dispatch(change('contactForm', 'county', this.props.address[1].result.admin_county));
    }

    onSubmit = formValues => {
        this.props.onSubmit(formValues);
        this.props.closeForm();
    }

    renderInput = ({ input, label}) => {
        return (
            <input type="text" placeholder={ label } autoComplete="off" { ...input }/>
        );
    }

    handleBlur(event) {
        this.setState({ postcodeCheck: event.target.value });
        this.props.getPostcode(event.target.value);
        this.props.getAddress(event.target.value);
    }

    postcodeLookup = () => {
        this.populateFields();
    }

    render() {
        return (
            <div className="contactForm" onClick={ this.props.closeForm }>
                <form className="contactForm__form" onSubmit={ this.props.handleSubmit(this.onSubmit) } onClick={(e) => e.stopPropagation()}>
                    <p className="contactForm__alert js-alert"></p>
                    <h1>{ this.props.title }</h1>
                    <Field name="name" label="Name" component={ this.renderInput } />
                    <Field name="address1" label="Address 1" component={ this.renderInput } />
                    <Field name="address2" label="Address 2" component={ this.renderInput } />
                    <Field name="town" label="Town / City" component={ this.renderInput } />
                    <Field name="county" label="County" component={ this.renderInput } />
                    <div className="contactForm__postcode">
                        <Field name="postcode" label="Postcode" component={ this.renderInput } onBlur={this.handleBlur.bind(this)}/>
                        <button type="button" onClick={ this.postcodeLookup }>Postcode Lookup</button>
                    </div>
                    <Field name="phone" label="Telephone" component={ this.renderInput } />
                    <Field name="email" label="Email" component={ this.renderInput } />
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { 
        address: Object.values(state.postcode), 
    }
}

export default connect(mapStateToProps, { getPostcode, getAddress })(reduxForm({ form: 'contactForm' })(ContactForm));