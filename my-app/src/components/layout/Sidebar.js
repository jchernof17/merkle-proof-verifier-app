import React from 'react';
import { object } from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Menu from 'components/ui/Menu';
import Icon from 'components/ui/Icon';
import AddNewItemMenu from 'containers/common/AddNewItemMenu';
import NewItemDialogs from 'containers/common/NewItemDialogs';
import { isCurrentURL } from 'utils/helpers';
import { dappName, sidebarWidth } from 'config';
import logo from 'img/logo.svg';

const Wrapper = styled.div`
  position: relative;
  min-width: ${sidebarWidth}px;
  min-height: 100vh;
  z-index: 99;
  box-shadow: 1px 0 2px 2px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 24px 24px 10px 20px;
  margin-bottom: 28px;
`;

const LogoImg = styled.img`
  position: relative;
  top: -10px;
`;


const PlusButton = styled.div`
  font-size: 24px;
  cursor: pointer;
  transition: transform .2s ease-in-out;
  transform: rotate(0);

  ${props => props.rotated && `
    transform: translate(-3px, -1px) rotate(45deg);
  `}
`;

class Sidebar extends React.Component {
  static propTypes = {
    history: object,
  };

  state = {
    addMenuVisible: false,
  }

  toggleNewItemMenu = () => {
    this.setState(prevState => ({
      addMenuVisible: !prevState.addMenuVisible,
    }));
  }

  render() {
    const { history } = this.props;
    const { addMenuVisible } = this.state;

    return (
      <Wrapper>
        <Header>
          <Link to="/">
            <LogoImg src={logo} alt={dappName} width={40} />
          </Link>
          <PlusButton onClick={this.toggleNewItemMenu} rotated={addMenuVisible}>
            <Icon name="plus" />
          </PlusButton>
        </Header>

        <AddNewItemMenu visible={addMenuVisible} />
        <NewItemDialogs />

        <Menu>
          <Menu.Item
            icon="home"
            onClick={() => history.push('/')}
            selected={isCurrentURL('/')}
          >
            Dashboard
          </Menu.Item>
          <Menu.Item
            icon="barcode"
            onClick={() => history.push('/products')}
            selected={isCurrentURL('/products')}
          >
            Products
          </Menu.Item>
          <Menu.Item
            icon="box"
            onClick={() => history.push('/suppliers')}
            selected={isCurrentURL('/suppliers')}
          >
            Suppliers
          </Menu.Item>
          <Menu.Item
            icon="check" // could possibly change this to a magnifying glass
            onClick={() => history.push('/search')}
            selected={isCurrentURL('/search')}
          >
            Search
          </Menu.Item>
        </Menu>
      </Wrapper>
    );
  }
}

export default withRouter(Sidebar);
