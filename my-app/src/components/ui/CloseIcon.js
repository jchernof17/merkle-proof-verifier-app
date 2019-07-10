import React from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';
import timesIcon from 'img/custom-icons/times.svg';

const Icon = styled.div`
  background-image: url(${timesIcon});
  background-size: 100% 100%;
  cursor: pointer;
  width: 14px;
  height: 14px;
`;

const CloseIcon = ({ onClick }) => (
  <Icon onClick={onClick} />
);

CloseIcon.propTypes = {
  onClick: func,
};

export default CloseIcon;
