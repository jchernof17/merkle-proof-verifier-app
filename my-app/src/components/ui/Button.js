import React from 'react';
import { node, bool } from 'prop-types';
import styled from 'styled-components';
import MUIButton from '@material-ui/core/Button';

const Wrapper = styled(({ link, centered, small, thick, ...rest }) => <MUIButton {...rest} />)`
  && {
    margin: 5px 0;
    font-size: 1em;
    text-transform: uppercase;
    padding-left: 25px;
    padding-right: 25px;

    ${props => props.thick && `
      height: 50px;
      font-size: 16px; 
    `}

    ${props => props.small && `
      font-size: 12px;
      padding: 2px;
    `}

    ${props => props.link && `
      padding: 0;
      margin: 5px 0 0;
      color: inherit;
      background: none !important;
      border: none;
      box-shadow: none;
      text-transform: none;
      text-decoration: underline !important;
    `}
  }
`;

const Button = ({ primary, children, link, ...rest }) => (
  <Wrapper
    color={primary ? 'primary' : 'default'}
    variant="contained"
    link={link}
    {...rest}
  >
    { children }
  </Wrapper>
);

Button.propTypes = {
  children: node,
  primary: bool,
  link: bool,
  small: bool,
  thick: bool,
};

export default Button;
