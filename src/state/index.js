import { useReducer } from 'preact/hooks'

import { playerReducer } from './players'

const reducers = {
    players: playerReducer
}

const persistedKeys = ['players']

const globalReducer = (state, action) => {
    
    const nextState = {...state}
    for(const key in reducers){
        if(action.type === 'init'){
            const storedJson = localStorage.getItem(key)
            if(storedJson){
                try {
                    nextState[key] = JSON.parse(storedJson)
                } catch {
                    console.error('Failed to parse stored JSON, data might be corrupted.')
                }
            }
        }

        nextState[key] = reducers[key](
            nextState[key],
            action
        )

        if(persistedKeys.includes(key)){
            localStorage.setItem(key, JSON.stringify(nextState[key]))
        }
    }
    return nextState
}

const initialState = {}

const startupState = globalReducer(initialState, { type: 'init' })

const useAppState = () => {
    return useReducer(globalReducer, startupState)
}

export default useAppState
