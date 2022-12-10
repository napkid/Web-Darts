// This file is part of WebDarts.
// WebDarts is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// WebDarts is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
// You should have received a copy of the GNU Affero General Public License along with WebDarts. If not, see <https://www.gnu.org/licenses/>. 

import { useEffect, useCallback } from 'preact/hooks'
import { availableLanguages, loadLocales, localeImportPath } from '../state/i18n'
import useGlobalState from './useGlobalState'


const dicts = {}

const useTranslation = () => {

    const [state, dispatch] = useGlobalState('i18n')

    const {
        loading,
        currentLanguage
    } = state
        
    const translate = (input, ...args) => {
        const key = Array.isArray(input)
            ? input[0]
            : input

        const translation = dicts[currentLanguage]?.[key]
        if(typeof translation === 'function'){
            return translation(...args) || key
        }

        return  translation || key
    }

    const setLanguage = useCallback(lang => {
        const newLang = new Intl.Locale(lang).language
        if(dicts[newLang]){
            dispatch({
                type: 'change_language',
                payload: newLang
            })
        } else if(loading !== newLang) {
            dispatch({
                type: 'load_language',
                payload: newLang
            })
        }
    }, [dispatch])
    

    useEffect(() => {
        if(loading){
            const importKey = Object.keys(loadLocales)
                .find(k => k.startsWith(`${localeImportPath}${loading}`))
        
            loadLocales[importKey]()
                .then(data => {
                    dicts[loading] = data
                    dispatch({
                        type: 'change_language',
                        payload: loading
                    })
                })
                // TODO : Handle errors
        }
        // TODO : Abort uneccesary requests
    }, [loading])

    return {
        t: translate,
        setLanguage,
        currentLanguage,
        loading,
        availableLanguages
    }
}


export default useTranslation
