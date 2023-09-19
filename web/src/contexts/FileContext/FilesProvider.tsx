import React, { useState } from 'react'

import { FilesContext, FilesContextType } from './FilesContext'

interface FileProviderProps {
  children: React.ReactNode
}

export const FilesProvider: React.FC<FileProviderProps> = ({ children }) => {
  const [filesSelected, setFilesSelected] = useState<File[]>([])

  const handleFileSelected = (file: File) => {
    if (
      !filesSelected.some(
        (fileAlreadySelected) => fileAlreadySelected.name === file.name
      )
    )
      setFilesSelected([...filesSelected, file])
  }

  const onRemoveFile = (fileName: string) => {
    const newFiles = filesSelected.filter((file) => file.name !== fileName)
    setFilesSelected(newFiles)
  }

  const clearFilesSelected = () => {
    setFilesSelected([])
  }

  const contextValue: FilesContextType = {
    filesSelected,
    handleFileSelected,
    onRemoveFile,
    clearFilesSelected,
  }

  return (
    <FilesContext.Provider value={contextValue}>
      {children}
    </FilesContext.Provider>
  )
}
