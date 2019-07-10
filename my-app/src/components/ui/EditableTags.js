import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import { bool, string, array, func } from 'prop-types';
import { Field } from 'redux-form';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Tags from 'components/ui/Tags';
import SelectField from 'components/fields/SelectField';
import Icon from 'components/ui/Icon';
import Button from 'components/ui/Button';

const Wrapper = styled.span`
  position: relative;
  display: inline-block;

  & > div {
    margin: 0;

    input {
      font-weight: inherit;
      font-size: inherit;
      margin-top: -10px;
    }
  }

  div {
    font-size: inherit;
  }
`;

const TagList = styled(Tags)`
  cursor: pointer;

  li:last-child {
    background-color: white;
    color: var(--light-grey-color);
    padding: 3px;

    &:hover {
      color: var(--medium-grey-color);
    }
  }
`;

const Options = styled.div`
  position: absolute;
  right: 0;
  bottom: -25px;
  display: flex;
  justify-content: space-between;
  width: 134px;
`;

/**
 * Editable text that turns into an input field.
 * Needs to be used in the context of a redux form
 */
const Editable = ({
  defaultValue,
  options,
  allowCustom,
  name,
  validate,
  supressErrorMessages,
  onUndo,
}) => {
  const [editing, setEditing] = useState(false);

  const reset = () => {
    setEditing(false);
    onUndo();
  };

  return (
    <ClickAwayListener onClickAway={reset}>
      <Wrapper>
        {
          editing ? (
            <Fragment>
              <Field
                name={name}
                type="text"
                component={SelectField}
                validate={validate}
                options={options}
                allowCustom={allowCustom}
                supressErrorMessages={supressErrorMessages}
                multiple
              />
              <Options>
                <Button onClick={reset} small>
                  Cancel
                </Button>
                <Button type="submit" primary small>
                  Done
                </Button>
              </Options>
            </Fragment>
          ) : (
            <TagList onClick={() => setEditing(true)}>
              {
                defaultValue.map(tag => <li key={tag}>{ tag }</li>)
              }
              <li>
                <Icon name="edit" />
              </li>
            </TagList>
          )
        }
      </Wrapper>
    </ClickAwayListener>
  );
};

Editable.propTypes = {
  defaultValue: array.isRequired,
  options: array,
  allowCustom: bool,
  name: string.isRequired,
  validate: array,
  supressErrorMessages: bool,
  onUndo: func,
};

export default Editable;
