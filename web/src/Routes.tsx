import { Router, Route, Set, Private } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'

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
          <Route path="/admin/files/{id}" page={FileFilePage} name="file" />
          <Route path="/" page={FileFilesPage} name="files" />
        </Set>
      </Private>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
