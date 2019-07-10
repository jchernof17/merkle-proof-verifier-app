import React from 'react';
import {
  bool,
  number,
  string,
  object,
  func,
  any,
} from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Label from '../../components/ui/Label';
import TextField from '../../components/ui/TextField';
import FieldHelper from '../fields/FieldHelper';

const InputField = (props) => {
  const {
    autoFocus,
    disabled,
    readOnly,
    label,
    placeholder = '',
    type,
    min,
    max,
    tabIndex,
    hiddenInput,
    input,
    innerRef = null,
    inputLabelProps,
    autoComplete,
    startAdornment,
    endAdornment,
    multiline,
    thick,
    rowsMax,
    supressErrorMessages,
    meta: { touched, error, warning },
  } = props;

  const hasError = touched && error !== undefined;
  const hasWarning = touched && warning !== undefined;

  return (
    <FormControl
      margin="normal"
      fullWidth
    >
      {
        label && (
          <Label error={hasError} warning={hasWarning} htmlFor={label}>{ label }</Label>
        )
      }
      <TextField
        {...input}
        autoFocus={autoFocus}
        type={type}
        min={min}
        max={max}
        tabIndex={tabIndex}
        placeholder={placeholder}
        style={hiddenInput ? { display: 'none' } : null}
        readOnly={readOnly}
        disabled={disabled}
        InputLabelProps={inputLabelProps}
        multiline={multiline}
        rowsMax={rowsMax}
        error={hasError}
        warning={hasWarning ? warning : undefined}
        thick={thick}
        InputProps={{
          startAdornment,
          endAdornment,
          autoComplete,
          inputRef: innerRef,
        }}
        id={label}
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

InputField.propTypes = {
  input: object,
  meta: object,
  type: string.isRequired,
  min: number,
  max: number,
  tabIndex: number,
  style: object,
  label: any,
  innerRef: func,
  inputLabelProps: object,
  placeholder: string,
  className: string,
  autoFocus: bool,
  disabled: bool,
  readOnly: bool,
  iconLabel: object,
  hiddenInput: bool,
  autoComplete: string,
  startAdornment: any,
  endAdornment: any,
  multiline: bool,
  rowsMax: number,
  supressErrorMessages: bool,
  thick: bool,
};

export default InputField;
