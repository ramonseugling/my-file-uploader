import styled from 'styled-components'

type StyledLabelFileUploadProps = {
  isDragActive?: boolean
}

export const StyledForm = styled.form`
  width: 100%;
  text-align: center;
`

export const StyledInputFileUpload = styled.input`
  display: none;
`

export const StyledLabelFileUpload = styled.label<StyledLabelFileUploadProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
  border-width: 2px;
  border-radius: 3px;
  border-style: dashed;
  border-color: #cbd5e1;
  background-color: ${(props) => (props.isDragActive ? '#ffff' : '#f8fafc')};
`

export const StyledUploadButton = styled.button`
  cursor: pointer;
  padding: 0.25rem;
  font-size: 1rem;
  border: none;
  background-color: transparent;

  &:hover {
    text-decoration-line: underline;
  }
`

export const StyledDragFileContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`
