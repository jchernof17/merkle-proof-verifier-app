import styled from 'styled-components';

const Tags = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  & > li {
    display: inline-block;
    background-color: var(--dark-white-color);
    border-radius: 3px;
    margin: ${props => (props.small ? '0 3px 3px 0' : '0 5px 5px 0;')};
    padding: ${props => (props.small ? '3px 5px' : '5px 10px;')};
    font-size: ${props => (props.small ? '0.8em' : '1em')};
  }
`;

export default Tags;
