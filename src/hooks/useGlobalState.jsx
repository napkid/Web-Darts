
import { createContext } from 'preact'
import { useContext } from 'preact/hooks'
import useAppState from '../state'

const GlobalContext = createContext([])


export const GlobalStateProvider = props => {
    const {
        children
    } = props

    const [state, dispatch] = useAppState()

    return <GlobalContext.Provider value={[state, dispatch]}>
        {children}
    </GlobalContext.Provider>
}

export const useGlobalState = (key) => {

    const [state, dispatch] = useContext(GlobalContext)

    const partialState = key
        ? state[key]
        : state
    
    return [partialState, dispatch]
}