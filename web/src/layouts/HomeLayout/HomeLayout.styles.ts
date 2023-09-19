import { styled } from 'styled-components'

export const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const PagesContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: start;
  height: 500px;
  padding: 3rem;
  border-radius: 5px;
  width: 600px;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.gray};
  gap: 2rem;
`

export const StyledMenu = styled.div`
  display: flex;
  gap: 1rem;
  align-items: start;
  margin-right: auto;
`
