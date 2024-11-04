// import ListenerProvider from './ListenerProvider'
import MongoProvider from './MongoProvider'

const Providers = ({ children }) => {
    return (
        <MongoProvider>
            {/* <ListenerProvider>{children}</ListenerProvider> */}
            {children}
        </MongoProvider>
    )
}

export default Providers
