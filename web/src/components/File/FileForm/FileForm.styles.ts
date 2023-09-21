import styled from 'styled-components'

import { Form } from '@redwoodjs/forms'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
`
export const StyledForm = styled(Form)`
  width: 100%;
  text-align: center;
`

export const StyledInputFileUpload = styled.input`
  display: none;
`

export const StyledLabelFileUpload = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 16rem;
  border-width: 2px;
  border-radius: 3px;
  border-style: dashed;
  border-color: #cbd5e1;
  margin: 2rem;
`

export const StyledUploadButton = styled.button`
  cursor: pointer;
  padding: 0.25rem;
  font-size: 1rem;
  border: none;
  background-color: transparent;
  color: #1d4ed8;

  &:hover {
    text-decoration-line: underline;
  }
`

export const StyledDragFileContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`
