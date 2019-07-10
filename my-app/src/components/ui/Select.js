import React from 'react';
import styled from 'styled-components';
import { bool, string, func, array, any } from 'prop-types';
import Creatable from 'react-select/lib/Creatable';
import ReactSelect from 'react-select';

const getColor = (props) => {
  if (props.warning) {
    return 'var(--warning-color);';
  }
  if (props.error) {
    return 'var(--error-color);';
  }
  return 'var(--light-grey-color);';
};

const Wrapper = styled.div`
  && {
    & > div {
      min-width: 200px;
      margin-bottom: 10px;

      & > div {
        min-height: 36px;
        border: 1px solid ${props => getColor(props)};

        &:hover {
          border: 1px solid ${props => getColor(props)};
        }

        &:active {
          border: 1px solid ${props => getColor(props)};
        }
      }
    }
  }
`;

const customStyles = {
  multiValueRemove: provided => ({
    ...provided,
    ':hover': {
      backgroundColor: 'var(--primary-color)',
      color: 'white',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? 'var(--lighter-grey-color)' : 'white',
    ':hover': {
      backgroundColor: 'var(--lighter-grey-color)',
    },
  }),
};

class Select extends React.Component {
  handleChange = (newValue) => {
    const { multiple } = this.props;
    if (multiple) {
      this.props.onChange(newValue.map(item => item.value));
    } else {
      this.props.onChange(newValue ? newValue.value : '');
    }
  };

  getValue = () => {
    const { value, options, allowCustom } = this.props;
    const values = !Array.isArray(value)
      ? value
        ? String(value).split(',') : []
      : value;
    return values.reduce((acc, val) => {
      const foundValue = options.find(opt => opt.value === value);
      if (!foundValue) {
        return allowCustom && val.length > 0 ? [
          ...acc,
          {
            label: val,
            value: val,
          },
        ] : acc;
      }
      return [
        ...acc,
        foundValue,
      ];
    }, []);
  }

  render() {
    const {
      placeholder,
      options,
      multiple,
      fullWidth,
      allowCustom,
      error,
      warning,
    } = this.props;

    const SelectComponent = allowCustom ? Creatable : ReactSelect;

    return (
      <Wrapper error={error} warning={warning}>
        <SelectComponent
          styles={customStyles}
          onChange={this.handleChange}
          options={options}
          placeholder={placeholder}
          isMulti={multiple}
          fullWidth={fullWidth}
          value={this.getValue()}
          isClearable
        />
      </Wrapper>
    );
  }
}

Select.propTypes = {
  placeholder: string,
  multiple: bool,
  options: array,
  onChange: func.isRequired,
  fullWidth: bool,
  allowCustom: bool,
  error: bool,
  warning: bool,
  value: any,
};

export default Select;
