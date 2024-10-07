import AuthProvider from './AuthProvider'
import ThemeProvider from './ThemeProvider'

const Providers = ({ children }) => {
    return (
        <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
        >
            <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
    )
}

export default Providers
