import styled from 'styled-components';
import { node } from 'prop-types';
//import errorIcon from 'img/error-icon.svg';

const FieldError = styled.div`
  color: white;
  background-color: var(--error-bg-color);
  padding: 5px 5px 5px 25px;
  border-radius: 3px;
  position: absolute;
  bottom: calc(100% - 18px);
  right: 0;
  font-size: 12px;

  &:after {
    content: '';
    width: 10px;
    height: 10px;
    position: absolute;
    top: 50%;
    margin-top: -5px;
    left: 6px;
    background-repeat: no-repeat;
    background-size: 100%;
  }
`;

FieldError.propTypes = {
  children: node,
};

export default FieldError;
