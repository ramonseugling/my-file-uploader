import { Link, routes } from '@redwoodjs/router'

import { MainContainer, PagesContainer, StyledMenu } from './HomeLayout.styles'

type HomeLayoutProps = {
  children?: React.ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <MainContainer>
      <PagesContainer>
        <StyledMenu>
          <Link to={routes.uploadFiles()}>Upload file</Link>
          <Link to={routes.myFiles()}>My files</Link>
        </StyledMenu>
        {children}
      </PagesContainer>
    </MainContainer>
  )
}

export default HomeLayout
