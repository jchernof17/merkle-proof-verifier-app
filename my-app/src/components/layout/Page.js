import React from 'react';
import { bool, any } from 'prop-types';
import styled from 'styled-components';
import Header from 'containers/common/Header';
import topBg from 'img/top-bg.png';
import bottomBg from 'img/bottom-bg.png';
import { sidebarWidth } from 'config';
import Sidebar from './Sidebar';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;

  h1 {
    margin: 0;
  }

  ${props => (props.showBackground
    ? `
      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 400px;
        background-image: url(${topBg});
        background-repeat: no-repeat;
        background-position: top;
        pointer-events: none;
        z-index: -1;
      }

      &:before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 400px;
        background-image: url(${bottomBg});
        background-repeat: no-repeat;
        background-position: bottom;
        pointer-events: none;
        z-index: -1;
      }
    ` : `
        background-color: var(--dark-white-color);
    `
  )}
`;

const Main = styled.div`
  padding: 0;
  width: ${props => (props.showSidebar ? `calc(100% - ${sidebarWidth}px)` : '100%')};

  & > div {
    padding: 40px 20px;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
`;

const Page = ({ showBackground, showHeader, showSidebar, children }) => (
  <Wrapper showBackground={showBackground}>
    <div className="space-between">
      { showSidebar && <Sidebar /> }
      <Main>
        { showHeader && <Header /> }
        <Container>
          { children }
        </Container>
      </Main>
    </div>
  </Wrapper>
);

Page.propTypes = {
  showBackground: bool,
  showSidebar: bool,
  showHeader: bool,
  children: any,
};

Page.defaultProps = {
  showHeader: true,
};

export default Page;
