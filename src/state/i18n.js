
export const loadLocales = import.meta.glob('/src/locales/*.js*', { import: 'default' })

export const localeImportPath = '/src/locales/'
export const availableLanguages = Object.keys(loadLocales).map(l => l
    .slice(localeImportPath.length)
    .split('.')[0]
)

const defaultLocale = navigator.language || 'en'
const defaultLanguage = new Intl.Locale(defaultLocale).language

const initialState = {
    currentLanguage: defaultLanguage,
    loading: defaultLanguage
}

export const i18nReducer = (state=initialState, action) => {
    const {
        type,
        payload
    } = action

    switch(type){
        case 'init':
            return {
                ...state,
                loading: state.currentLanguage
            }
        case 'change_language':
            return {
                ...state,
                loading: null,
                currentLanguage: payload
            }
        case 'load_language':
            return {
                ...state,
                loading: payload
            }
        default:
            return state
    }
}