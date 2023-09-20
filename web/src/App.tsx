import { ThemeProvider } from 'styled-components'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

import { AuthProvider, useAuth } from './auth'

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <AuthProvider>
        <ThemeProvider theme={defaultTheme}>
          <RedwoodApolloProvider useAuth={useAuth}>
            <Routes />
            <GlobalStyle />
          </RedwoodApolloProvider>
        </ThemeProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
