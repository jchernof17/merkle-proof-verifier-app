import styled from 'styled-components';

const getBorderColor = (props, defaultColor) => (
  props.error
    ? 'var(--error-bg-color)'
    : props.warning
      ? 'var(--warning-bg-color)'
      : defaultColor
);

const Label = styled.label`
  display: inline-block;
  text-transform: uppercase;
  color: ${props => (getBorderColor(props, 'var(--light-grey-color)'))};
  font-size: 12px;
  font-weight: normal;
  letter-spacing: 1.2px;
  margin-bottom: 10px;
`;

export default Label;
