import React from 'react';
import styled from 'styled-components';
import { bool, string, array, func } from 'prop-types';
import { Field } from 'redux-form';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import InputField from 'components/fields/InputField';
import Icon from 'components/ui/Icon';

const Wrapper = styled.span`
  && {
    position: relative;
    display: inline-block;
    ${props => (props.fullWidth ? 'width: 100%' : '')}

    .icon-edit {
      display: none;
      position: absolute;
      top: 50%;
      right: 10px;
      font-size: 14px; 
      margin-top: -10px;
      color: var(--medium-grey-color);
    }

    & > div {
      margin: 0;

      [class*="focused"]:after{
        content: 'Hit Enter ↵ to SAVE';
        position: absolute;
        bottom: -65%;
        right: 2px;
        top: auto;
        left: auto;
        font-size: 11px;
        font-weight: normal;
        transition: none;
        transform: none;
        margin: 0;
        color: var(--medium-grey-color);

        .icon-edit {
          display: none;
        }
      }

      & > div > div > input {
        font-weight: inherit;
        font-size: inherit;
        margin-top: -6px;
        margin-left: -10px;
        padding: 6px 24px 6px 6px;
        width: 100%;

        &:not(:active), &:not(:focus) {
          border: 1px solid transparent !important;
          outline: none;
          cursor: pointer;
        }

        &:hover {
          background-color: var(--dark-white-color);
        }

        &:active, &:focus {
          cursor: default;
          border: 1px solid var(--medium-grey-color) !important;
          background-color: transparent;
        }
      }
    }

    &:hover {
      .icon-edit {
        display: block;
      }
    }

    div {
      font-size: inherit;
      margin: 0;
    }
  }
`;

/**
 * Editable text that turns into an input field.
 * Needs to be used in the context of a redux form
 */
const Editable = ({
  onUndo,
  name,
  validate,
  supressErrorMessages,
  fullWidth,
  innerRef,
}) => (
  <Wrapper fullWidth={fullWidth}>
    <ClickAwayListener onClickAway={onUndo}>
      <React.Fragment>
        <Field
          name={name}
          type="text"
          component={InputField}
          validate={validate}
          supressErrorMessages={supressErrorMessages}
          onBlur={onUndo}
          autoComplete="off"
          innerRef={innerRef}
        />
        <Icon name="edit" />
      </React.Fragment>
    </ClickAwayListener>
  </Wrapper>
);

Editable.propTypes = {
  onUndo: func.isRequired,
  name: string.isRequired,
  validate: array,
  fullWidth: bool,
  supressErrorMessages: bool,
  innerRef: func,
};

export default Editable;
