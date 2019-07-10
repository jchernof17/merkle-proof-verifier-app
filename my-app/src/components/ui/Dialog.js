import styled from 'styled-components';
import MUIDialog from '@material-ui/core/Dialog';
import MUIDialogTitle from '@material-ui/core/DialogTitle';
import MUIDialogContent from '@material-ui/core/DialogContent';

const Dialog = styled(MUIDialog)`
  & > div > div {
    overflow-y: visible;
    background-color: #fdfdfd;
  }
`;

Dialog.Title = styled(MUIDialogTitle)`
  && {
    width: 100%;
    border-bottom: 1px solid var(--lighter-grey-color);

    h6 {
      display: flex;
      justify-content: space-between;
      align-items: center;

      & > span {
        font-size: 1.25em;
        color: var(--medium-grey-color);
      }
    }
  }
`;

Dialog.Content = styled(MUIDialogContent)`
  && {
    padding: 20px 40px;
    overflow-y: visible;
  }
`;

export default Dialog;
