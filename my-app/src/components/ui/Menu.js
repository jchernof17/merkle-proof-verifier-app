import React from 'react';
import { node, any } from 'prop-types';
import styled from 'styled-components';
import MUIMenuList from '@material-ui/core/MenuList';
import MUIMenuItem from '@material-ui/core/MenuItem';

const Menu = MUIMenuList;

const MenuItem = styled(MUIMenuItem)`
  && {
    padding-left: 24px;
    padding-right: 24px;
    height: 30px;
    display: flex;
    align-items: center;

    ${props => props.selected && `
      background-color: var(--primary-color) !important;

      &:hover, &:focus, &:active {
        background-color: var(--primary-color) !important;
      }
    `};
  }
`;

const MenuIcon = styled.i`
  display: inline-block;
  font-size: 20px;
  width: 20px;
  margin-right: 20px;
  text-align: center;

  ${props => props.selected && `
      color: white;
  `};
`;

const MenuText = styled.span`
  ${props => props.selected && `
      color: white;
  `};
`;

Menu.Item = React.forwardRef(({ icon, children, ...rest }, ref) => (
  <MenuItem ref={ref} {...rest}>
    <MenuIcon className={`icon-${icon}`} {...rest} />
    <MenuText {...rest}>{ children }</MenuText>
  </MenuItem>
));

Menu.Item.propTypes = {
  icon: node,
  children: any,
};

export default Menu;
