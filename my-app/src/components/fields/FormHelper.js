import React from 'react';
import styled from 'styled-components';
import { node } from 'prop-types';
import FieldHelper from './FieldHelper';

const Wrapper = styled.div`
  width: 100%;
  text-align: center;
`;

const Message = styled(FieldHelper)`
  display: inline-block;
  text-align: left;
  position: relative;
  margin: 10px auto;
  top: 0;
  left: 0;
  padding: 8px 8px 8px 32px;

  &:after {
    left: 10px;
  }
`;

const FormHelper = ({ children, ...rest }) => (
  <Wrapper>
    <Message {...rest}>
      { children}
    </Message>
  </Wrapper>
);

FormHelper.propTypes = {
  children: node,
};

export default FormHelper;
