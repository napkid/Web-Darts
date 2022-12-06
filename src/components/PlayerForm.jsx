import React, { useState } from 'react'
import { useTranslation } from '../hooks/i18n'

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

    return <li className="h-12 text-2xl">
        <form className={'w-full h-full'} onSubmit={handleSubmit}>
            <div className="relative mt-1 rounded-md shadow-sm">
                <input
                    className="pr-10 shadow-lg bg-emerald-800 border border-gray-500 text-white w-full h-full p-2 rounded-lg"
                    type="text"
                    autoFocus={autoFocus}
                    placeholder={t`player-placeholder`}
                    value={name}
                    onChange={e => onChange(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    {typeof onRemove === 'function' && <button
                        type="button"
                        className="text-white"
                        onClick={onRemove}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>

                    </button>}
                    {typeof onSubmit === 'function' && <button className="text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>

                    </button>}
                </div>
            </div>
        </form>
    </li>
}

export default PlayerForm
