import React from 'react';
import { bool, node } from 'prop-types';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

const getBgColor = (props) => {
  if (props.info) {
    return `background-color: var(--info-color);
color: inherit;`;
  }
  if (props.success) {
    return 'background-color: var(--success-color);';
  }
  if (props.warning) {
    return 'background-color: var(--warning-color);';
  }
  if (props.error) {
    return 'background-color: var(--error-color);';
  }
  return 'background-color: var(--light-grey-color);';
};

const Wrapper = styled(({ info, success, warning, error, ...rest }) => <Paper {...rest} />)`
  && {
    color: white;
    padding: 12px;
    ${props => getBgColor(props)}
    box-shadow: none !important;
  }
`;

const Message = ({ info, success, warning, error, children }) => (
  <Wrapper info={info} success={success} warning={warning} error={error}>
    { children }
  </Wrapper>
);

Message.propTypes = {
  info: bool,
  success: bool,
  warning: bool,
  error: bool,
  children: node,
};

export default Message;
