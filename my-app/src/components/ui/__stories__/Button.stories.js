import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from '../Button';

storiesOf('Button', module)
  .add('normal', () => (
    <Button onClick={action('clicked')}>Hello, Button</Button>
  ))
  .add('primary', () => (
    <Button onClick={action('clicked')} primary>
      Hello, Button
    </Button>
  ))
  .add('inner html', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));
