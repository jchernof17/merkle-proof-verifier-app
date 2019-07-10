import React, { useState } from 'react';
import Message from 'components/ui/Message';
import { string, number, oneOfType, object } from 'prop-types';
import { ipfsGatewayBaseUrl } from 'utils/ipfs';
import fileIcon from 'img/file.svg';

const IPFSImagePreview = ({ value, style }) => {
  const [fileValue, setFileValue] = useState(value);

  let file = {};

  if (typeof fileValue === 'string') {
    try {
      file = JSON.parse(fileValue);
    } catch (err) {
      return (
        <Message error>
          Wrong format.
        </Message>
      );
    }
  } else {
    file = value;
  }

  const handleError = () => {
    // retry loading the url by re-rendering
    const { url, hash, name } = file;
    const imageURL = url || `${ipfsGatewayBaseUrl}/ipfs/${hash}/${name}`;
    console.error(`Error loading image from ipfs: ${imageURL}`);
    setFileValue(value);
  };

  if ((file.url || file.hash) && file.name) {
    const { url, hash, name } = file;
    const src = url || `${ipfsGatewayBaseUrl}/ipfs/${hash}/${name}`;
    return (
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          alignSelf: 'center',
          ...style,
        }}
        onError={handleError}
      >
        <img src={fileIcon} alt="file" width={40} />
      </a>
    );
  } else {
    return (
      <Message error>
        Wrong format.
      </Message>
    );
  }
};

IPFSImagePreview.propTypes = {
  value: oneOfType([string, object]).isRequired,
  alt: string,
  width: oneOfType([string, number]),
  height: oneOfType([string, number]),
  style: object,
};

IPFSImagePreview.defaultProps = {
  width: 'auto',
  height: 'auto',
};

export default IPFSImagePreview;
