import styled from 'styled-components';

const Table = styled.table`
  width: ${props => (props.fullWidth ? '100%' : 'auto')};
  text-align: left;

  thead {
    width: 100%;

    tr {
      display: flex;
      justify-content: space-between;
      width: 100%;

      th {
        text-transform: uppercase;
        color: var(--light-grey-color);
        font-size: 12px;
        font-weight: normal;
        letter-spacing: 1.2px;
        margin-bottom: 20px;
      }
    }
  }

  tbody {
    width: 100%;

    tr {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 15px;
      margin-bottom: 20px;
      background-color: white;
      border: 1px solid var(--lighter-grey-color);
      border-radius: 5px;

      td {
        display: flex;
        align-items: center;
      }
    }
  }
`;

export default Table;
