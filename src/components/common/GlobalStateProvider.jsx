import { GlobalContext } from "../../hooks/useGlobalState"
import useAppState from "../../state"

const GlobalStateProvider = props => {
    const {
        children
    } = props

    const [state, dispatch] = useAppState()

    return <GlobalContext.Provider value={[state, dispatch]}>
        {children}
    </GlobalContext.Provider>
}

export default GlobalStateProvider
