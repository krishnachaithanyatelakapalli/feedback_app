import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
    renderSurveyField() {
        const fields = formFields.map(({name, label}, i) => <Field key={i} type="text" name={name} component={SurveyField} label={label} />);
        return (
            <div>
                {fields}
            </div>
        )
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.props.handleSubmit(this.props.nextHandler)}>
                    <Field 
                        type="text"
                        name="surveyTitle"
                        component={this.renderSurveyField}
                        placeholder="Title"
                    />
                    <Link to='/surveys' className="red btn-flat left white-text"> 
                        Cancel
                        <i className="material-icons right">clear</i>
                    </Link>
                    <button type="submit"
                        className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        )
    }
}

const validate = (values) => {
    const errors = {};

    errors.recipients = validateEmails(values.recipients);

    formFields.map(({ name }) => {
        if (!values[name]) {
            return errors[name] = 'Provide a value';
        }
    });

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);