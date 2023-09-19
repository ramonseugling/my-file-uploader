import { createContext } from 'react'

export interface FilesContextType {
  filesSelected: File[]
  handleFileSelected: (file: File) => void
  onRemoveFile: (fileName: string) => void
  clearFilesSelected: () => void
}

export const FilesContext = createContext<FilesContextType>({
  filesSelected: [],
  handleFileSelected: () => {},
  onRemoveFile: () => {},
  clearFilesSelected: () => {},
})
