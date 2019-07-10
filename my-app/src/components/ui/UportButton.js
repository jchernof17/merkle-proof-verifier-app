import React from 'react';
import styled from 'styled-components';
import uportLogo from 'img/uport-logo.svg';
import { func, string, bool } from 'prop-types';
import Button from './Button';

const Wrapper = styled(Button)`
  && {
    background-color: var(--uport-color) !important;

    span {
      width: 95%;
      margin-right: 10px;
      color: white;
      font-size: 1em;
    }
  }
`;

const UportButton = ({ value, onClick, fullWidth, ...rest }) => (
  <Wrapper
    onClick={onClick}
    fullWidth={fullWidth}
    {...rest}
  >
    <span>{ value }</span>
    <img src={uportLogo} alt="uport-logo" width={30} />
  </Wrapper>
);

UportButton.propTypes = {
  onClick: func,
  value: string,
  fullWidth: bool,
};

export default UportButton;
