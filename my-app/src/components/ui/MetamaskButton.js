import React from 'react';
import styled from 'styled-components';
import metamaskLogo from 'img/metamask-logo.svg';
import { func, string, bool } from 'prop-types';
import Button from './Button';

const Wrapper = styled(Button)`
  && {
    background-color: var(--metamask-color) !important;

    span {
      width: 95%;
      margin-right: 10px;
      color: white;
      font-size: 1em;
    }
  }
`;

const MetamaskButton = ({ type, value, fullWidth, onClick, ...rest }) => (
  <Wrapper
    type={type}
    onClick={onClick}
    fullWidth={fullWidth}
    {...rest}
  >
    <img src={metamaskLogo} alt="metamask-fox" width={30} />
    <span>{ value }</span>
  </Wrapper>
);

MetamaskButton.propTypes = {
  type: string,
  onClick: func,
  value: string,
  fullWidth: bool,
};

export default MetamaskButton;
