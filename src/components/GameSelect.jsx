import { Link, Route } from 'wouter'

import clsx from 'clsx'
import { categories, games, gamesByCat } from "../config/games"
import { useTranslation } from '../config/i18n'


const GameSelect = props => {

    const {
        t
    } = useTranslation()

    return <div className="px-2 py-4 h-full flex flex-col justify-center">

        <h2 className="text-3xl text-white font-semibold text-center mb-4">
            {t`choose-game`}
        </h2>
        <Route path="/game-selection/">
            <ul className="px-4 mb-4 space-y-4 ">
                {categories.map(game => <li>
                    <Link href={`/game-selection/${game.value}`}>
                        <button
                            className={clsx(
                                'bg-gradient-to-t uppercase shadow-xl w-full px-6 py-4 font-semibold border border-gray-500 text-2xl text-white rounded-lg',
                                {
                                    'from-yellow-600 to-yellow-400': game.colorClass === 'yellow',
                                    'from-red-800 to-red-600': game.colorClass === 'red'
                                }
                            )}
                        >
                            {game.label}
                        </button>
                    </Link>
                </li>)}
            </ul>
        </Route>
        <Route path="/game-selection/:id">
            {params => <ul className="grid grid-cols-2 gap-2 mb-4">
                {gamesByCat[params.id].map(g => <li>
                    <Link href={`/game/${g.value}`}>
                        <button
                            type="button"
                            className="w-full rounded-lg border border-transparent bg-emerald-600 px-6 py-3 text-xl font-semibold text-white shadow-xl hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                        >
                            {g.label}
                        </button>
                    </Link>
                </li>)}
            </ul>}
        </Route>

    </div>
}

export default GameSelect
