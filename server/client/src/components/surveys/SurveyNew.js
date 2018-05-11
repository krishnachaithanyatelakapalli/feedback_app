import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            showReview: false
        }
        this.onNextHandler = this.onNextHandler.bind(this);
        this.onCancelHandler = this.onCancelHandler.bind(this);
    }

    onNextHandler() {
        this.setState({showReview: true});
    }

    onCancelHandler() {
        this.setState({showReview: false});
    }

    render() {
        let survey = <SurveyForm nextHandler={this.onNextHandler} />;
        if (this.state.showReview) {
            survey = <SurveyFormReview cancelHandler={this.onCancelHandler} />;
        }
        return (
            <div>
                {survey}
            </div>
        )
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);