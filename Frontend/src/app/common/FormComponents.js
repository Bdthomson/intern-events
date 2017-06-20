import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import DropdownList from 'react-widgets/lib/DropdownList';
import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';

import { change } from 'redux-form';

import Geosuggest from 'react-geosuggest';

momentLocalizer(Moment);


export const hiddenField = ({ input }) => {
  return (
    <input type="text" {...input} hidden />
  )
}

export const dropdownField = props => {

  const {
    input, data, label, valueField, textField,
    meta: { error, touched }
  } = props;

  return (
    <FormGroup validationState={error && touched ? 'error' : null}>
      <label>{label}</label>
      <ControlLabel>{touched && error && <span>&nbsp;&nbsp;{error}</span>}</ControlLabel>
      <DropdownList
        {...input}
        data={data}
        valueField={valueField}
        textField={textField}
        onChange={input.onChange}
      />
    </FormGroup>
  )
}

export const inputField = props => {
  const {
    input: { value, onChange },
    meta: { error, touched },
    label, type, placeholder, componentClass
  } = props;

  return (
    <FormGroup validationState={error && touched ? 'error' : null}>
      <label>{label}</label>
      {/*<ControlLabel>{touched && error && <span>&nbsp;&nbsp;{error}</span>}</ControlLabel>*/}
      &nbsp;&nbsp;
      {/*{error}*/}
      <FormControl
        componentClass={componentClass}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </FormGroup>
  )
}

export class geosuggestField extends Component {
  // Workaround until Geosuggest fixes input change bug.
  componentWillReceiveProps(nextProps) {
    if (this.props.input.value !== nextProps.input.value) {
      this.refs.geosuggest.update(nextProps.input.value)
    }
  }
  parseNameAndAddress(label) {
    let result = {}

    let fields = label.split(',')

    result.name = fields[0];
    fields.shift()
    result.address = fields.join(',')
    console.log("Split: ", { result });

    return result;
  }

  render() {
    const { input, label, meta: { error, touched, dispatch }, ...custom } = this.props
    return (
      <FormGroup validationState={error && touched ? 'error' : null}>
        <label>{label}</label>
        <ControlLabel>{touched && error && <span>&nbsp;&nbsp;{error}</span>}</ControlLabel>
        &nbsp;&nbsp;
            {/*TODO: Set the address somewhere*/}
        <Geosuggest
          ref="geosuggest"
          initialValue={input.value}
          inputClassName="form-control"
          onSuggestSelect={suggest => {
            const { name, address } = this.parseNameAndAddress(suggest.label)
            dispatch(change('addEventForm', 'placeId', suggest.placeId))
            dispatch(change('addEventForm', 'address', address))
            dispatch(change('addEventForm', 'name', name))
            return input.onChange(suggest.label)
          }}
          renderSuggestItem={result => <p key={result.placeId}>{result.label}</p>}
          {...custom}
        />
      </FormGroup>
    )
  }
}

export const dateTimeField = props => {
  const { label, input: {onChange, value} } = props;
  return (
    <FormGroup>
      <label>{label}</label>
      <DateTimePicker
        step={10}
        onChange={onChange}
        format="MMM DD - hh:mm a"
        value={!value ? null : new Date(value)}
      />
    </FormGroup>
  )
}




// export const dropdownField = props => {
//   const {
//     input: { value, onChange },
//     meta: { error, touched },
//     label, type, placeholder, componentClass
//   } = props;

//   return (
//     <FormGroup>
//       <label>Favorite Color</label>
//       <div>
//         <Field name="favoriteColor" component="select">
//           <option />
//           <option value="ff0000">Red</option>
//           <option value="00ff00">Green</option>
//           <option value="0000ff">Blue</option>
//         </Field>
//       </div>
//     </FormGroup>
//   )
// }