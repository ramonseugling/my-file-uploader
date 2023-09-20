import { ThemeProvider } from 'styled-components'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <ThemeProvider theme={defaultTheme}>
        <RedwoodApolloProvider>
          <Routes />
          <GlobalStyle />
        </RedwoodApolloProvider>
      </ThemeProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
