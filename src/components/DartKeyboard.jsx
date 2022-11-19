import React, { useState } from 'react'
import clsx from "clsx"


const keys = [
    ...Array(20).fill(null).map((n, idx) => ({
        label: `${idx+1}`,
        value: idx+1,
        maxCount: 3
    })),
    {
        label: 'BULL',
        value: 25,
        maxCount: 2
    }
]

const dartCount = 3

const DartKeyboard = props => {
    const {
        onSubmit,
        onExit,
        open,
    } = props

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
        onSubmit({
            shots: state,
            score
        })
        setState([])
    }


    return <div className={clsx('transition-all ease-in absolute bottom-0 left-0 shadow-xl w-full max-h-0 overflow-hidden', {
        'max-h-full': open
    })}>
        <div className="w-full rounded-t-xl bg-emerald-500">
            <div className="rounded-t-xl bg-yellow-100 text-xl text-center py-2 font-semibold mb-4">
                <p>Total: {score}</p>
            </div>
            <div className="grid grid-cols-4 gap-3 px-4 mb-4">
                {keys.map(key => {
                    const hitCount = countHitOnKey(key.value)
                    return <button
                        className={clsx(
                            {
                                'bg-white': hitCount === 0,
                                'bg-emerald-100 text-emerald-800': hitCount === 1,
                                'bg-emerald-200 text-emerald-800': hitCount === 2,
                                'bg-emerald-300 text-emerald-800': hitCount === 3,
                                'bg-emerald-400 text-emerald-800': hitCount === 4,
                                'bg-emerald-500 text-emerald-800': hitCount === 5,
                                'bg-emerald-600 text-white': hitCount === 6,
                                'bg-emerald-700 text-white': hitCount === 7,
                                'bg-emerald-800 text-white': hitCount === 8,
                                'bg-emerald-900 text-white': hitCount === 9
                            },
                            'w-full py-4 rounded-lg shadow-lg text-xl font-semibold',
                        )}
                        onClick={() => handleScore(key)}
                    >
                        {key.label}
                    </button>
                })}
            </div>

            <div className="px-2 py-2">

                <button className="mr-4 px-4 py-2 bg-emerald-700 font-semibold text-white rounded-lg" onClick={handleSubmit}>
                    OK
                </button>

                <button
                    className="px-4 py-2 bg-gray-300 font-semibold text-gray-700 rounded-lg"
                    onClick={onExit}>
                    Exit
                </button>
            </div>
        </div>
    </div>
}

export default DartKeyboard
