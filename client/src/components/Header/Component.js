import React from 'react';
import HeaderLogo from './Logo';
import styled from 'styled-components/macro';
import HeaderDarkButton from './DarkButton';
import HeaderWrapper from './Wrapper';
import HeaderNavLink from './NavLink';
import HeaderUsername from './Username';

const InnerWrapper = styled.div`
  width: 100%;
  height: 48px;

  margin: 0 auto;
  max-width: 1190px;
  padding: 0 20px;

  display: flex;
  align-items: stretch;
  user-select: none;

  @media (max-width: 768px) {
    height: 40px;
    padding: 0px;
  }
`;

const Header = ({ auth, logoutUser, toggleTheme }) => (
  <HeaderWrapper>
    <InnerWrapper>
      <HeaderLogo />
      <HeaderDarkButton onClick={toggleTheme} />
      {auth.isAuthenticated ? (
        <>
          <HeaderUsername user={auth.user} />
          <HeaderNavLink as="span" onClick={logoutUser}>
            Logout
          </HeaderNavLink>
        </>
      ) : (
        <>
          <HeaderNavLink to="/login">Login</HeaderNavLink>
          <HeaderNavLink to="/register">Register</HeaderNavLink>
        </>
      )}
    </InnerWrapper>
  </HeaderWrapper>
);

export default Header;
