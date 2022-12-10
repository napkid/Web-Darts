// This file is part of WebDarts.
// WebDarts is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// WebDarts is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
// You should have received a copy of the GNU Affero General Public License along with WebDarts. If not, see <https://www.gnu.org/licenses/>. 

import { useReducer } from 'preact/hooks'
import { i18nReducer } from './i18n'

import { playerReducer } from './players'

const reducers = {
    players: playerReducer,
    i18n: i18nReducer
}

const persistedKeys = ['players', 'i18n']

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
