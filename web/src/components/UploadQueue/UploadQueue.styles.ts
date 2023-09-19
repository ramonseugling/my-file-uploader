import styled from 'styled-components'

export const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 100px;
    border: none;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #e4e4e4;
    border-radius: 100px;
  }
`

export const StyledTitle = styled.span`
  font-weight: 400;
`

export const StyledQueueContainer = styled.div`
  border: 1px solid #0505050f;
  width: 100%;
  height: 100%;
  overflow: auto;
  border-radius: 3px;
`
