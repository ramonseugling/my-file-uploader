import { useContext } from 'react'

import { FilesContext, FilesContextType } from './FilesContext'

export const useFilesContext = (): FilesContextType => {
  const context = useContext(FilesContext)

  if (!context) {
    throw new Error('useFilesContext must be used within a FilesProvider')
  }
  return context
}
