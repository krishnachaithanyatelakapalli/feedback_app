import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actions from '../../actions';
import formFields from './formFields';

const SurveyFormReview = (props) => {
    const fields = formFields.map(({label, name}) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {props.formDetails[name]}
                </div>
            </div>
        );
    });

    return (
        <div className="container">
            <h5>Please confirm all the values entered</h5>
            <div>{fields}</div>
            <button 
                onClick={props.cancelHandler}
                className="red btn-flat left white-text">
                Back
                <i className="material-icons left">chevron_left</i>
            </button>
            <button 
                onClick={() => props.saveSurvey(props.formDetails, props.history)}
                className="green btn-flat right white-text">
                Submit Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        formDetails: state.form.surveyForm.values
    }
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));