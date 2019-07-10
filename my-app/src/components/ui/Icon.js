import React from 'react';
import { string, object } from 'prop-types';

const Icon = ({ name, color, style }) => (
  <i className={`icon-${name}`} style={{ color, ...style }} />
);

Icon.propTypes = {
  name: string,
  color: string,
  style: object,
};

export default Icon;
