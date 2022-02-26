import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { SnackbarProvider } from 'notistack'

import Routing from './routes/Routing'
import ErrorBoundary from './components/ErrorBoundary'

import { ThemeSettings } from './assets/ThemeSettings'

function App() {
    return (
        <ThemeProvider theme={ThemeSettings}>
            <SnackbarProvider
                maxSnack={3}
                preventDuplicate
            >
                <ErrorBoundary>
                    <CssBaseline />
                    <Routing />
                </ErrorBoundary>
            </SnackbarProvider>
        </ThemeProvider>
    )
}

export default App
