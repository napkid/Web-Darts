import { useEffect, useRef, useCallback } from 'preact/hooks'
import { availableLanguages, loadLocales, localeImportPath } from '../state/i18n'
import { useGlobalState } from './useGlobalState'


const dicts = {}

export const useTranslation = () => {

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

