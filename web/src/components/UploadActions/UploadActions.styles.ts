import styled from 'styled-components'

export const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  gap: 1rem;
  margin-top: auto;
`

export const StyledUploadButton = styled.button`
  padding: 0.5rem;
  background-color: ${(props) => props.theme['blue-500']};
  border: 0;
  color: ${(props) => props.theme.white};
  border-radius: 3px;
  width: 5rem;
`

export const StyledClearButton = styled.button`
  padding: 0.5rem;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme['gray-300']};
  color: ${(props) => props.theme['gray-300']};
  border-radius: 3px;
  width: 5rem;
`
