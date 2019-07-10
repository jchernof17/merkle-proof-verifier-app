import React from 'react';

import { storiesOf } from '@storybook/react';
import Loader from '../Loader';

storiesOf('Loader', module)
  .addDecorator(story => (
    <div style={{ width: 300, backgroundColor: 'yellow' }}>{story()}</div>
  ))
  .add('normal', () => <Loader />)
  .add('full width', () => <Loader fullWidth />);
