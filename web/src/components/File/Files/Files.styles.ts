import { styled } from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;

  span {
    font-size: 0.85rem;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 100px;
    border: none;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme['gray-100']};
    border-radius: 100px;
  }
`

export const DocumentsContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  overflow: auto;
`
