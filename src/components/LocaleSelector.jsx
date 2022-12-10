import clsx from 'clsx'
import { useState } from 'preact/hooks'
import { useTranslation } from '../hooks/i18n'
import Button from './Button'

const LocaleSelector = props => {
    const {
        t,
        currentLanguage,
        setLanguage,
        availableLanguages
    } = useTranslation()
    const [menuOpen, setMenuOpen] = useState(false)

    const handleLangChange = l => {
        setLanguage(l)
        setMenuOpen(false)
    }

    return <div className="text-right">
        <Button pill color="gray" size="small"
            onClick={() => setMenuOpen(!menuOpen)}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
            </svg>

        </Button>
        <ul className={clsx('relative top-0 shadow-lg transition duration-1000 ease-in transition-all max-h-0 overflow-hidden bg-emerald-600 rounded-lg mt-2', {
            'max-h-max': menuOpen
        })}>
            {availableLanguages.map(l => <li key={l}>
            <button
                className={clsx('px-8 py-4 text-white font-semibold', {
                    'bg-emerald-700': currentLanguage === l
                })}
                onClick={() => handleLangChange(l)}
            >
                {t(l)}
            </button>
            </li>)}
        </ul>
    </div>
}

export default LocaleSelector
