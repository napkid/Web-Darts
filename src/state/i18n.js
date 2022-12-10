// This file is part of WebDarts.
// WebDarts is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// WebDarts is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
// You should have received a copy of the GNU Affero General Public License along with WebDarts. If not, see <https://www.gnu.org/licenses/>. 

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