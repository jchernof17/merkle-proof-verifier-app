import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MetamaskButton from '../MetamaskButton';

storiesOf('MetamaskButton', module)
  .addDecorator(story => (
    <div style={{ width: 300, backgroundColor: 'yellow' }}>{story()}</div>
  ))
  .add('normal', () => <MetamaskButton onClick={action('clicked')} />)
  .add('fullWidth', () => <MetamaskButton fullWidth primary />)
  .add('value', () => <MetamaskButton value="abc!" />);
