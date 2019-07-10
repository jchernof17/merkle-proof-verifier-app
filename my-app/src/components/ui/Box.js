import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

const Box = styled(Paper)`
  && {
    background-color: white;
    width: 100%;
    margin: 0 auto 24px;
    border-radius: 3px;
    border: 1px solid var(--lighter-grey-color);
    box-shadow: none;
  }
`;

Box.Header = styled.div`
  text-transform: uppercase;
  padding: 30px;
  border-bottom: 1px solid var(--lighter-grey-color);
`;

Box.Content = styled.div`
  padding: 30px;
`;

export default Box;
