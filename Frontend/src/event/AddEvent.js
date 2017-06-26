import React from 'react'
import { Field, reduxForm } from 'redux-form/immutable'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Actions
import { addEventRequest } from '.';

import { inputField, geosuggestField, dateTimeField, dropdownField, hiddenField } from '../app/common/FormComponents';

const eventTypes = [{ event: 'Food', value: 'food' }, { event: 'Recreation', value: 'recreation' }]

const onSubmit = (values, dispatch, props) => {

  // Conver to JSON
  let v = values.toJS()

  // Grab value from dropdown's object/value pairing.
  v.type = v.type.event;

  // Delete location property
  delete v.location;

  // Set the google maps link
  let service = new window.google.maps.places.PlacesService(document.createElement('div'));
  service.getDetails({ placeId: v.placeId }, res => {
    v.link = res.url
    delete v.placeId;
    props.addEvent(v)
      .then(() => props.history.push('/'));
  })
}

const AddEventForm = props => {
  const { handleSubmit } = props;
  return (
    <form className="white-text" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-md-6">
        {/* Hidden fields used for data manipulation. Alternative to storing on the the redux store. */}
        <Field name="address" component={hiddenField} />
        <Field name="placeId" component={hiddenField} />

        <Field
          name="creator"
          label="Event Creator"
          component={inputField}
          placeholder="Your Name"
        />

        <Field
          name="type"
          label="Type"
          component={dropdownField}
          data={eventTypes}
          textField="event"
          valueField="value"
        />


        <Field
          name="restricted"
          id="restricted"
          component="input"
          type="checkbox"
        />

        <label htmlFor="restricted">&nbsp;&nbsp;21 and Over</label>

        <Field
          name="location"
          component={geosuggestField}
          label="Location"
        />

        <Field
          name="description"
          label="Description"
          componentClass="textarea"
          component={inputField}
          type="text"
          placeholder="Optional"
        />

        <Field
          label="Time"
          name="datetime"
          component={dateTimeField}
        />

        <Button bsStyle="primary" type="submit">Add Event</Button>
        <Link to="/"><Button bsStyle="default">Cancel</Button></Link>
      </div>
    </form>
  )
}

const validate = values => {
  let errors = {};

  if (!values.get('name')) errors.name = "Required";
  if (!values.get('creator')) errors.creator = "Required";
  if (!values.get('type')) errors.type = "Required";
  if (!values.get('location')) errors.location = "Required";
  if (!values.get('datetime')) errors.datetime = "Required";

  return errors;
}

const form = reduxForm({
  validate,
  touchOnBlur: false,
  form: 'addEventForm' // a unique identifier for this form
})(AddEventForm)


function mapDispatchToProps(dispatch) {
  return {
    addEvent: (e) => dispatch(addEventRequest(e)),
  };
}

export default connect(null, mapDispatchToProps)(form);