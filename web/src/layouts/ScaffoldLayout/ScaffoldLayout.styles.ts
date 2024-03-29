import { styled } from 'styled-components'

import { NavLink } from '@redwoodjs/router'

export const MainContainer = styled.main`
  width: 100vw;
  height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${(props) => props.theme['blue-300']};
`

export const PagesContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 500px;
  padding: 2rem;
  border-radius: 5px;
  width: 700px;
  flex-direction: column;
  border: 1px solid #0505052e;
  gap: 2rem;
  background-color: ${(props) => props.theme.white};

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
  }

  @media (min-width: 1600px) {
    width: 900px;
    height: 700px;
  }
`

export const StyledMenu = styled.div`
  display: flex;
  gap: 1rem;
  align-items: start;
  margin-right: auto;
`

export const StyledLink = styled(NavLink)`
  color: ${(props) => props.theme.black};
  text-decoration: none;

  border-top: 3px solid transparent;
  border-bottom: 3px solid transparent;

  &:hover {
    border-bottom: 3px solid #1d4ed8;
  }

  &.active {
    border-bottom: 3px solid #1d4ed8;
  }
`

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: ${(props) => props.theme['blue-500']};
`

export const StyledTitle = styled.h2`
  color: ${(props) => props.theme.white};
`

export const StyledLogoutButton = styled.button`
  color: ${(props) => props.theme['blue-500']};
  background-color: ${(props) => props.theme.white};
  display: flex;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 1rem;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 0.025em;
  border-radius: 0.25rem;
  line-height: 2;
  border: 0;
`
