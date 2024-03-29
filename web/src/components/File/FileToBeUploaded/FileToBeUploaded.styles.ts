import styled from 'styled-components'

export const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme['gray-100']};
  padding: 1rem;
`

export const StyledDocumentInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`

export const StyledDocumentTypeContainer = styled.div`
  background-color: ${(props) => props.theme['blue-500']};
  color: ${(props) => props.theme.white};
  padding: 1rem;
`

export const StyledDocumentNameAndSizeContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  gap: 0.5rem;
  align-items: self-start;

  :first-child {
    font-weight: 700;
  }
`

export const StyledDocumentActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  button {
    background-color: transparent;
    border: none;
  }
`
