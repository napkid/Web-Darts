import { createContext } from 'preact'
import { useState, useContext, useEffect, useRef } from 'preact/hooks'

const loadLocales = import.meta.glob('/src/locales/*.js*', { import: 'default' })

const localeImportPath = '/src/locales/'
const availableLanguages = Object.keys(loadLocales).map(l => l
    .slice(localeImportPath.length)
    .split('.')[0]
)

const I18nContext = createContext()

export const useTranslation = () => {
    const {t, setLanguage, loading, availableLanguages, currentLanguage} = useContext(I18nContext)

    return {
        t,
        setLanguage,
        currentLanguage,
        loading,
        availableLanguages
    }
}

const defaultLocale = navigator?.language || 'en'

export const I18nProvider = props => {

    const {
        children
    } = props

    const [locale, setLocale] = useState(new Intl.Locale(defaultLocale).language)
    const [loading, setLoading] = useState(true)
    const [dict, setDict] = useState({})

    const translate = (input, ...args) => {
        const key = Array.isArray(input)
            ? input[0]
            : input

        const translation = dict?.[locale]?.[key]
        if(typeof translation === 'function'){
            return translation(...args) || key
        }

        return  translation || key
    }

    const loadingPromise = useRef(null)

    useEffect(() => {
        if(!dict[locale]){
            loadLocale(locale)
        }
    }, [locale])

    const loadLocale = lang => {
        
        const importKey = Object.keys(loadLocales)
            .find(k => k.startsWith(`${localeImportPath}${lang}`))

        loadLocales[importKey]()
            .then(data => {
                setDict({
                    [lang]: data,
                    ...dict
                })
                setLoading(false)
            })
        
    }

    const setLanguage = locale => {
        setLocale(
            new Intl.Locale(locale).language
        )
    }
    

    return <I18nContext.Provider value={{
        t: translate,
        loading,
        setLanguage,
        currentLanguage: locale,
        availableLanguages,
        _loadingPromise: loadingPromise
    }}>
        {children}
    </I18nContext.Provider>
}

