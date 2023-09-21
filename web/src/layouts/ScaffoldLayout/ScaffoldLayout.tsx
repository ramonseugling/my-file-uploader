import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

import {
  MainContainer,
  PagesContainer,
  StyledHeader,
  StyledLink,
  StyledLogoutButton,
  StyledMenu,
  StyledTitle,
} from './ScaffoldLayout.styles'

type LayoutProps = {
  title: string
  titleTo: string
  buttonLabel: string
  buttonTo: string
  children: React.ReactNode
}

const ScaffoldLayout = ({ children }: LayoutProps) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()

  return (
    <>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <StyledHeader>
        <StyledTitle>Hello, {currentUser?.name} :)</StyledTitle>

        {isAuthenticated ? (
          <StyledLogoutButton type="button" onClick={logOut}>
            Logout
          </StyledLogoutButton>
        ) : (
          <Link to={routes.login()}>Login</Link>
        )}
      </StyledHeader>
      <MainContainer>
        <PagesContainer>
          <StyledMenu>
            <StyledLink activeClassName="active" to={routes.files()}>
              My files
            </StyledLink>
            <StyledLink activeClassName="active" to={routes.newFile()}>
              Upload file
            </StyledLink>
          </StyledMenu>
          {children}
        </PagesContainer>
      </MainContainer>
    </>
  )
}

export default ScaffoldLayout
