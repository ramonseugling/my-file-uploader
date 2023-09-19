import { routes } from '@redwoodjs/router'

import {
  MainContainer,
  PagesContainer,
  StyledLink,
  StyledMenu,
} from './HomeLayout.styles'

type HomeLayoutProps = {
  children?: React.ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <MainContainer>
      <PagesContainer>
        <StyledMenu>
          <StyledLink to={routes.uploadFiles()}>Upload file</StyledLink>
          <StyledLink to={routes.myFiles()}>My files</StyledLink>
        </StyledMenu>
        {children}
      </PagesContainer>
    </MainContainer>
  )
}

export default HomeLayout
