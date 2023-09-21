import { DotsThreeOutline, FolderNotchMinus } from 'phosphor-react'
import { styled } from 'styled-components'

export const Container = styled.div`
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

export const DocumentsContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  overflow: auto;
`

export const DocumentContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #0505052e;
  border-radius: 5px;
  width: 250px;
  padding: 1rem;
  gap: 3rem;
`

export const DocumentIconsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const DocumentInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const StyledFolderNotchMinus = styled(FolderNotchMinus)`
  color: #2479dd;
`

export const StyledDotsThreeOutline = styled(DotsThreeOutline)`
  color: black;
`

export const StyledTitle = styled.div`
  span {
    font-size: 0.85rem;
    font-weight: 700;
  }
`

export const StyledOtherProperties = styled.div`
  span {
    font-size: 0.7rem;
  }
`

export const StyledMenuButton = styled.button`
  background-color: transparent;
  border: none;
`
