import React from 'react';
import {
  bool,
  number,
  string,
  object,
  func,
  any,
  array,
} from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FieldHelper from 'components/fields/FieldHelper';
import Select from 'components/ui/Select';
import Label from 'components/ui/Label';

const SelectField = (props) => {
  const {
    disabled,
    readOnly,
    label,
    placeholder = '',
    tabIndex,
    input,
    multiple,
    allowCustom,
    options,
    supressErrorMessages,
    meta: { touched, error, warning },
  } = props;

  const hasError = touched && error !== undefined;
  const hasWarning = touched && warning !== undefined;

  // convert array to string if multiple is enabled
  const handleChange = (value) => {
    if (multiple && Array.isArray(value)) {
      input.onChange(value.join(','));
    } else {
      input.onChange(value);
    }
  };

  return (
    <FormControl
      margin="normal"
      fullWidth
    >
      {
        label && (
          <Label htmlFor={input.name}>
            { label }
          </Label>
        )
      }
      <Select
        {...input}
        label={label}
        tabIndex={tabIndex}
        placeholder={placeholder}
        onChange={handleChange}
        readOnly={readOnly}
        disabled={disabled}
        error={touched && error !== undefined}
        multiple={multiple}
        allowCustom={allowCustom}
        options={options}
      />
      {
        hasError && !supressErrorMessages ? (
          <FieldHelper error>{ error }</FieldHelper>
        ) : hasWarning ? (
          <FieldHelper warning>{ warning }</FieldHelper>
        ) : null
      }
    </FormControl>
  );
};

SelectField.propTypes = {
  input: object,
  meta: object,
  tabIndex: number,
  label: any,
  innerRef: func,
  placeholder: string,
  className: string,
  disabled: bool,
  readOnly: bool,
  iconLabel: object,
  multiple: bool,
  allowCustom: bool,
  options: array,
  supressErrorMessages: bool,
};

export default SelectField;
