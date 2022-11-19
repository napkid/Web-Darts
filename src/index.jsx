import { render } from 'preact'
import App from './components/App'
import { I18nProvider } from './config/i18n'

import './style/index.css'

render(
    <I18nProvider>
        <App />
    </I18nProvider>,
    document.getElementById('root')
)