// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, Private } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'
// import HomeLayout from './layouts/HomeLayout/HomeLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Private unauthenticated="login">
        <Set wrap={ScaffoldLayout} title="Files" titleTo="files" buttonLabel="New File" buttonTo="newFile">
          <Route path="/admin/files/new" page={FileNewFilePage} name="newFile" />
          <Route path="/admin/files/{id}/edit" page={FileEditFilePage} name="editFile" />
          <Route path="/admin/files/{id}" page={FileFilePage} name="file" />
          <Route path="/" page={FileFilesPage} name="files" />
        </Set>
      </Private>
      {/* <Set wrap={HomeLayout}> */}
      {/* <Route path="/" page={UploadFilesPage} name="uploadFiles" /> */}
      {/* <Route path="/my-files" page={MyFilesPage} name="myFiles" /> */}
      <Route notfound page={NotFoundPage} />
      {/* </Set> */}
    </Router>
  )
}

export default Routes
