import React from 'react';
import { bool, object, func } from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import MUISnackbar from '@material-ui/core/Snackbar';
import { isSnackbarVisible, getSnackbarOptions } from 'store/global/selectors';
import { hideSnackbar } from 'store/global/actions';

const Wrapper = styled(MUISnackbar)`
  & > div {
    color: white;
    background-color: ${props => (props.type === 'info'
    ? 'var(--info-color)'
    : props.type === 'success'
      ? 'var(--success-color)'
      : props.type === 'warning'
        ? 'var(--warning-color)'
        : props.type === 'error'
          ? 'var(--error-color)'
          : 'default')};
  }
`;

const Snackbar = ({ visible, options, hideSnackbar }) => (
  <Wrapper
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    type={options.type}
    open={visible}
    message={options.message}
    autoHideDuration={options.timeout || 5000}
    onClose={hideSnackbar}
  />
);

Snackbar.propTypes = {
  visible: bool,
  options: object,
  hideSnackbar: func,
};

const mapStateToProps = state => ({
  visible: isSnackbarVisible(state),
  options: getSnackbarOptions(state),
});

const mapDispatchToProps = {
  hideSnackbar,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Snackbar);
