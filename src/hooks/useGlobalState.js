
import { createContext } from 'preact'
import { useContext } from 'preact/hooks'

export const GlobalContext = createContext([])

const useGlobalState = (key) => {

    const [state, dispatch] = useContext(GlobalContext)

    const partialState = key
        ? state[key]
        : state
    
    return [partialState, dispatch]
}

export default useGlobalState
