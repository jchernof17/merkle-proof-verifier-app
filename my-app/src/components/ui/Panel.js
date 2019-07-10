import React from 'react';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

const Panel = styled(({ fullWidth, ...rest }) => <Paper {...rest} />)`
  background-color: white;
  max-width: 360px;
  width: 100%;
  margin: 20px auto;
  border-radius: 3px;

  ${props => props.fullWidth && 'max-width: 100%'}
`;

Panel.Header = styled.h1`
  margin: 0;
  font-size: 24px;
  padding: 30px 20px;
  border-bottom: 1px solid var(--light-grey-color);
  font-weight: normal;
`;

Panel.Body = styled.div`
  padding: 20px;
`;

Panel.Footer = styled.div`
  margin: 0 0 20px 0;
  padding: 20px;
  border-top: 1px solid var(--dark-white-color);
`;

export default Panel;
