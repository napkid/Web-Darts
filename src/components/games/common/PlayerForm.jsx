// This file is part of WebDarts.
// WebDarts is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// WebDarts is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
// You should have received a copy of the GNU Affero General Public License along with WebDarts. If not, see <https://www.gnu.org/licenses/>. 

import useTranslation from '../../../hooks/i18n'
import Button from '../../common/Button'

const PlayerForm = props => {

    const {
        name,
        autoFocus,
        onChange,
        onSubmit,
        onRemove
    } = props

    const { t } = useTranslation()

    const handleSubmit = (e) => {
        e.preventDefault()
        if(typeof onSubmit === 'function'){
            onSubmit()
        }
    }

    return <li className="text-2xl h-12">
        <form className={'w-full h-full'} onSubmit={handleSubmit}>
            <div className="before:absolute before:-z-10 before:rounded-lg before:content-[\' \'] before:top-1 before:left-0 before:h-full before:w-full before:bg-emerald-700 relative h-full rounded-md shadow-sm">
                <input
                    className="focus-visible:outline-0 focus:outline-0 focus:ring-inset focus:ring-2 focus:ring-white placeholder:text-slate-300 pr-10 px-2 shadow-lg bg-emerald-500 text-white w-full h-full rounded-lg"
                    type="text"
                    autoFocus={autoFocus}
                    placeholder={t`player-placeholder`}
                    value={name}
                    onChange={e => onChange(e.target.value)}
                />
                <div className="absolute h-full z-10 inset-y-0 right-0 -top-1">
                    {typeof onRemove === 'function' && <Button
                        full
                        rounded
                        color="red"
                        size="small"
                        onClick={onRemove}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={8} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>

                    </Button>}
                    {typeof onSubmit === 'function' && <Button
                        full
                        rounded
                        color="blue"
                        size="small"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>

                    </Button>}
                </div>
            </div>
        </form>
    </li>
}

export default PlayerForm
