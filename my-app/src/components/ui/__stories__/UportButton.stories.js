import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import UportButton from '../UportButton';

storiesOf('UportButton', module)
  .addDecorator(story => (
    <div style={{ width: 300, backgroundColor: 'yellow' }}>{story()}</div>
  ))
  .add('normal', () => <UportButton onClick={action('clicked')} />)
  .add('fullWidth', () => <UportButton fullWidth primary />)
  .add('value', () => <UportButton value="abc!" />);
