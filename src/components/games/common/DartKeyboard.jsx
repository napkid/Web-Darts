// This file is part of WebDarts.
// WebDarts is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// WebDarts is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
// You should have received a copy of the GNU Affero General Public License along with WebDarts. If not, see <https://www.gnu.org/licenses/>. 

import clsx from 'clsx'
import { useState } from 'preact/hooks'
import useTranslation from '../../../hooks/i18n'

import Button from '../../common/Button'

const fullMatrix = [
    ...Array(5).fill(null)
        .map((n, rowIdx) => Array(4).fill(null)
            .map((n, colIdx) => ({
                label: `${1+rowIdx*4+colIdx}`,
                value: 1+rowIdx*4+colIdx,
                maxCount: 3
            }))),
    [{
        label: 'BULL',
        value: 25,
        maxCount: 2
    }]
]

const defaultDartCount = 3

const DartKeyboard = (props) => {
    const {
        onSubmit,
        onExit,
        open,
        matrix,
        disallowEmpty,
        dartCount: propsDartCount
    } = props

    const dartCount = propsDartCount || defaultDartCount

    const keyMatrix = matrix || fullMatrix

    const { t } = useTranslation()

    const [state, setState] = useState([])

    const score = state.reduce((score, value) => score+value, 0)
    const countHitOnKey = key => state.filter(value => value === key).length

    const handleScore = key => {
        if(
            countHitOnKey(key.value) === key.maxCount*dartCount
            || state.length >= dartCount*3
        ){
            setState(state.filter(h => h !== key.value))
        } else {
            setState([
                ...state,
                key.value
            ])
        }
    }

    const handleSubmit = () => {
        if(disallowEmpty && state.length === 0){
            return
        }
        onSubmit({
            shots: state,
            score
        })
        setState([])
    }


    return <div className={clsx('transition-all ease-in absolute z-50 bottom-0 left-0 shadow-xl w-full max-h-0 overflow-hidden', {
        'max-h-full': open
    })}>
        <div className="w-full px-4 py-4 rounded-t-xl bg-emerald-500">
            {/* <div className="rounded-t-xl bg-yellow-100 text-xl text-center py-2 font-semibold mb-4">
                <p>Total: {score}</p>
            </div> */}
            <div className="flex flex-col mb-4 relative z-0 space-y-4 mb-8">
                {keyMatrix.map((row, idx) => <div key={idx} className="flex w-full space-x-4">
                    {row.map(key => {
                        const hitCount = countHitOnKey(key.value)
                        return <Button
                            key={key.value}
                            color="gray"
                            full
                            rounded
                            className={clsx('py-4',
                                {
                                    'hover:bg-white text-gray-600 bg-white': hitCount === 0,
                                    'hover:bg-blue-400 bg-blue-400 text-white': hitCount === 1,
                                    'hover:bg-yellow-400 bg-yellow-400 text-white': hitCount === 2,
                                    'hover:bg-red-400 bg-red-400 text-white': hitCount === 3,
                                    'hover:bg-blue-600 bg-blue-600 text-white': hitCount === 4,
                                    'hover:bg-yellow-700 bg-yellow-700 bg-yellow-500 white': hitCount === 5,
                                    'hover:bg-red-500 bg-red-500 text-white': hitCount === 6,
                                    'hover:bg-blue-700 bg-blue-700 bg-orange-500 text-white': hitCount === 7,
                                    'hover:bg-red-800 bg-red-500 text-white': hitCount === 8,
                                    'hover:bg-gray-900 bg-gray-900 text-white': hitCount === 9
                                }
                            )}
                            onClick={() => handleScore(key)}
                        >
                            {key.label}
                        </Button>
                    })}
                </div>)}
            </div>

            <div className="flex relative z-0 space-x-4">
                <Button
                    full
                    color="gray"
                    size="small"
                    rounded
                    onClick={onExit}>
                    {t`cancel`}
                </Button>

                <Button 
                    color="blue"
                    size="small"
                    full
                    rounded
                    onClick={handleSubmit}>
                    {t`OK`}
                </Button>
            </div>
        </div>
    </div>
}

export default DartKeyboard
