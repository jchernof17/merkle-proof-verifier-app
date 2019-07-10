import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import { string, array, func } from 'prop-types';
import { Field } from 'redux-form';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Icon from 'components/ui/Icon';
import Button from 'components/ui/Button';
import IPFSImagePreview from 'components/ui/IPFSImagePreview';
import FileField from 'components/fields/FileField';
import {
  imageAllowedExtensions,
  imageMaxFilesizeMB,
} from 'config';

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  width: calc(100% - 20px);
  cursor: pointer;

  @media(max-width: 768px) {
    width: 100%;
    margin-bottom: 20px;
  }

  & > div:first-child {
    margin: 0;
    height: 150px;

    & > div:first-child {
      height: 100%;
      margin: 0;

      img {
        display: block;
        margin: 0 auto;
      }
    }
  }

  .icon-edit {
    display: none;
    position: absolute;
    top: 0;
    left: 120px;
  }

  &:hover {
    .icon-edit {
      display: block;
    }
  }
`;

const Options = styled.div`
  position: absolute;
  right: 0;
  bottom: -36px;
  display: flex;
  justify-content: space-between;
  width: 134px;
`;

const PreviewWrapper = styled.div`
  cursor: pointer;
`;

/**
 * Editable text that turns into an input field.
 * Needs to be used in the context of a redux form
 */
const EditablePicture = ({
  defaultValue,
  name,
  validate,
  onUndo,
}) => {
  const [editing, setEditing] = useState(false);
  const [isDirty, setDirty] = useState(false);

  const reset = () => {
    setEditing(false);
    setDirty(false);
    onUndo();
  };

  return (
    <ClickAwayListener onClickAway={reset}>
      <Wrapper>
        {
          editing || !defaultValue ? (
            <Fragment>
              <Field
                name={name}
                component={FileField}
                validate={validate}
                allowedExtensions={imageAllowedExtensions}
                maxFilesizeMB={imageMaxFilesizeMB}
                onChange={() => setDirty(true)}
                compact
              />
              {
                isDirty && (
                  <Options>
                    <Button onClick={reset} small>
                      Cancel
                    </Button>
                    <Button type="submit" primary small>
                      Save
                    </Button>
                  </Options>
                )
              }
            </Fragment>
          ) : (
            <PreviewWrapper onClick={() => setEditing(true)}>
              <IPFSImagePreview
                value={defaultValue}
                alt={name}
                width={100}
                style={{ margin: '0 20px 0 10px' }}
              />
              <Icon name="edit" />
            </PreviewWrapper>
          )
        }
      </Wrapper>
    </ClickAwayListener>
  );
};

EditablePicture.propTypes = {
  defaultValue: string,
  form: string.isRequired, /* eslint-disable-line */
  name: string.isRequired,
  validate: array,
  onUndo: func.isRequired,
};

export default EditablePicture;
