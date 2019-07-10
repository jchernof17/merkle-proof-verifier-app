import React from 'react';

import { storiesOf } from '@storybook/react';
import Message from '../Message';

storiesOf('Message', module)
  .add('success', () => <Message info>Success message</Message>)
  .add('info', () => <Message info>Info message</Message>)
  .add('error', () => <Message error>Error message</Message>)
  .add('inner html', () => (
    <Message>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Message>
  ));
