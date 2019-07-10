import React, { useState } from 'react';
import {
  bool,
  number,
  string,
  array,
  object,
  any,
  arrayOf,
} from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FieldHelper from 'components/fields/FieldHelper';
import FileDrop from 'components/ui/FileDrop';
import Label from 'components/ui/Label';
import { upload, pin, ipfsGatewayBaseUrl } from 'utils/ipfs';

const FileField = (props) => {
  const {
    disabled,
    label,
    tabIndex,
    input,
    allowedExtensions,
    maxFilesizeMB,
    multiple,
    supressErrorMessages,
    compact,
    input: { value },
  } = props;

  const [file, setFile] = useState({});

  const uploadFile = (errorMessage, files) => {
    if (errorMessage) {
      input.onChange('');
      setFile({
        status: 'error',
        errorMessage,
        info: null,
      });
      return;
    }

    if (files && files.length > 0) {
      const file = files[0];
      const { name, size, type } = file;
      setFile({
        status: 'loading',
        info: null,
      });
      upload(file)
        .then((response) => {
          const { directoryHash: hash } = response;
          const value = JSON.stringify({
            hash,
            name,
            size,
            type,
          });
          input.onChange(value);
          setFile({
            status: 'success',
            info: {
              url: `${ipfsGatewayBaseUrl}/ipfs/${hash}/${name}`,
              hash,
              size,
              type,
              name,
            },
          });
          return pin(hash);
        }).catch((error) => {
          console.error(error);
          setFile({
            status: 'error',
            info: null,
          });
        });
    } else {
      input.onChange('');
      setFile({
        status: null,
        info: null,
      });
    }
  };

  const hasError = file.status === 'error';

  return (
    <FormControl
      margin="normal"
      fullWidth
    >
      {
        label && (
          <Label error={hasError} htmlFor={input.name}>
            { label }
          </Label>
        )
      }
      <FileDrop
        {...input}
        allowedExtensions={allowedExtensions}
        maxFilesizeMB={maxFilesizeMB}
        onChange={uploadFile}
        tabIndex={tabIndex}
        multiple={multiple}
        disabled={disabled}
        file={value ? JSON.parse(value) : file.info}
        loading={file.status === 'loading'}
        error={hasError}
        compact={compact}
      />
      {
        hasError && !supressErrorMessages
          ? file.errorMessage
            ? <FieldHelper error>{ file.errorMessage }</FieldHelper>
            : (
              <FieldHelper error={hasError}>
                Error uploading file
              </FieldHelper>
            ) : null
      }
    </FormControl>
  );
};

FileField.propTypes = {
  input: object,
  meta: object,
  tabIndex: number,
  label: any,
  className: string,
  disabled: bool,
  allowedFormats: array,
  maxFilesizeMB: number,
  multiple: bool,
  allowedExtensions: arrayOf(string),
  compact: bool,
  supressErrorMessages: bool,
};

export default FileField;
