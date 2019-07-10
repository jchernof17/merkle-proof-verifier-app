import React from 'react';
import styled from 'styled-components';
import MUITextField from '@material-ui/core/TextField';

const getBorderColor = (props, defaultColor) => (
  props.error
    ? 'var(--error-bg-color)'
    : props.warning
      ? 'var(--warning-bg-color)'
      : defaultColor
);

const inputStyles = props => (
  `border: 1px solid ${getBorderColor(props, 'var(--dark-white-color)')};
  padding: 10px;
  border-radius: 5px;

  ${props.thick && `
    padding: 15px 10px;
    font-size: 16px;
    background-color: ${'var(--dark-white-color)'};
  `}

  &:hover {
    border: 1px solid ${getBorderColor(props, 'var(--medium-grey-color)')};
  }

  &:active {
    border: 1px solid ${getBorderColor(props, 'var(--dark-grey-color)')};
  }`
);

const TextField = styled(({ thick, multiline, ...rest }) => <MUITextField multiline={multiline} {...rest} />)`
  && {
    ${props => (props.disabled ? 'pointer-events: none' : '')}

    & > div {

      ${props => props.multiline && inputStyles(props)}
      
      &:before, &:after {
        border-bottom: none !important;
      }

      & > input {
        ${props => inputStyles(props)}
      }
    }

    p {
      font-size: .9em;
    }
  }
`;

export default TextField;
