import React from 'react'
import { Field, reduxForm } from 'redux-form/immutable'
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';

// Actions
import {
    addGuestRequest
} from '.';

import { inputField } from '../app/common/FormComponents';

const onSubmit = (values, dispatch, props) => {
    console.log(values.toJS());
    props.addGuest(props.rID, values.toJS())
    props.reset()
}

const SignUpForm = props => {
    const { handleSubmit } = props;
    return (
        <Form className="white-text" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div>
                    <Field name="name" component={inputField}
                        label="Your Name" placeholder="Enter name" />
                    {/*<Field name="email" component={inputField}*/}
                    {/*label="Email (To be notified)" placeholder="Enter email" type="text" />*/}
                    {/*TODO: change back to email after testing*/}

                    <Button bsStyle="primary" type="submit">Add Yourself</Button>
                </div>
            </div>
        </Form>
    )
}

const validate = values => {
    let errors = {};

    if (!values.get('name')) errors.name = "Required";

    return errors;
}

const form = reduxForm({
    validate,
    touchOnBlur: false
})(SignUpForm)

function mapDispatchToProps(dispatch) {
    return {
        addGuest: (rID, guest) => dispatch(addGuestRequest(rID, guest)),
    };
}

export default connect(null, mapDispatchToProps)(form);