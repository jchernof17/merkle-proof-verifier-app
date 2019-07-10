import React from 'react';
import { bool } from 'prop-types';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: ${props => (props.fullWidth ? '100%' : 'auto')};
`;

const Loader = ({ fullWidth }) => (
  <Wrapper fullWidth={fullWidth}>
    <CircularProgress
      color="primary"
    />
  </Wrapper>
);

Loader.propTypes = {
  fullWidth: bool,
};

export default Loader;
