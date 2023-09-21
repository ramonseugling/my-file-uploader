import { DotsThreeOutline, FolderNotchMinus } from 'phosphor-react'
import styled from 'styled-components'

export const DocumentContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #0505052e;
  border-radius: 5px;
  max-width: 267px;
  width: 100%;
  padding: 1rem;
  gap: 3rem;

  @media (min-width: 768px) and (max-width: 1600px) {
    width: 100%;
    max-width: 309px;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    margin-right: 1rem;
  }
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
  color: ${(props) => props.theme['blue-500']};
`

export const StyledDotsThreeOutline = styled(DotsThreeOutline)`
  color: ${(props) => props.theme.black};
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
