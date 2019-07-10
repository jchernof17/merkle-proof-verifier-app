import React, { useState } from 'react';
import { string, number, bool, func, object, arrayOf } from 'prop-types';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import filesize from 'filesize';
import imgPlaceholder from 'img/image-placeholder.svg';
import Loader from 'components/ui/Loader';
import timesIcon from 'img/custom-icons/times-white.svg';
import IPFSFilePreview from './IPFSFilePreview';
import IPFSImagePreview from './IPFSImagePreview';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: ${props => (props.error ? '1px solid var(--error-bg-color)' : '1px dashed var(--light-grey-color)')};
  border-radius: 3px;
  padding: 30px 30px 26px;
  margin-top: 10px;
  cursor: pointer;
  outline: none;

  ${props => (props.dragging ? `
    background-color: var(--dark-white-color);
    color: white;
  ` : '')}
`;

const Info = styled.div`
  font-size: 12px;
  width: 70%;

  h4 {
    font-size: 18px;
    margin: 0 0 5px 0;
  }

  p {
    color: var(--primary-color);
    margin: 0 0 8px;
  }

  span {
    display: block;
    color: var(--light-grey-color);
    text-transform: uppercase;

    &.filesize {
      margin-bottom: 15px;
    }
  }
`;

const RemoveButton = styled.div`
  background-image: url(${timesIcon});
  background-size: 50% 50%;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  width: 12px;
  height: 12px;
  position: absolute;
  border-radius: 50%;
  padding: 10px;
  top: -10px;
  right: -10px;
  background-color: var(--primary-color);
`;

/**
 * FileDrop
 * Drag and drop File Input Component that uploads the file to ipfs
 * based on the current ipfs configuration
 */
const FileDrop = (props) => {
  const {
    allowedExtensions,
    maxFilesizeMB,
    disabled,
    loading,
    error,
    onChange,
    file,
    compact,
  } = props;

  const allowedExtensionsDot = allowedExtensions ? allowedExtensions.map(ext => `.${ext}`) : [];
  const [dragging, setDragging] = useState(false);

  const handleFiles = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      onChange(`File must be under ${maxFilesizeMB} MB`, acceptedFiles);
    } else if (acceptedFiles.length > 0) {
      onChange(null, acceptedFiles);
    }
  };

  return (
    <Dropzone
      onDrop={handleFiles}
      onDragEnter={() => setDragging(true)}
      onDragLeave={() => setDragging(false)}
      accept={allowedExtensionsDot}
      maxSize={maxFilesizeMB * 1024 * 1024}
      disabled={disabled}
    >
      {({ getRootProps, getInputProps }) => (
        <Wrapper {...getRootProps()} error={error} dragging={dragging}>
          {
            loading ? (
              <Loader fullWidth />
            ) : file ? (
              <React.Fragment>
                {
                  file.name.endsWith('jpg') || file.name.endsWith('png') || file.name.endsWith('gif')
                    ? <IPFSImagePreview value={file} width={60} />
                    : <IPFSFilePreview value={file} width={60} />
                }
                <RemoveButton onClick={(e) => {
                  onChange(null, null);
                  e.stopPropagation();
                }}
                />
                <input {...getInputProps()} />
                {
                  compact ? null : (
                    <Info>
                      <h4>{ file.name }</h4>
                      <span className="filesize">{ filesize(file.size) }</span>
                      <p>Drag & Drop or click to replace</p>
                    </Info>
                  )
                }
              </React.Fragment>
            ) : (
              <React.Fragment>
                <img src={imgPlaceholder} alt="placeholder" />
                <input {...getInputProps()} />
                {
                  compact ? null : (
                    <Info>
                      <p>Drag & Drop or click to Upload </p>
                      <span>
                        { allowedExtensions ? allowedExtensions.join(', ') : '' }
                      </span>
                    </Info>
                  )
                }
              </React.Fragment>
            )
          }
        </Wrapper>
      )}
    </Dropzone>
  );
};

FileDrop.propTypes = {
  allowedExtensions: arrayOf(string),
  maxFilesizeMB: number,
  onChange: func,
  disabled: bool,
  loading: bool,
  error: bool,
  file: object,
  compact: bool,
};

export default FileDrop;
