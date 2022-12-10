// This file is part of WebDarts.
// WebDarts is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// WebDarts is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
// You should have received a copy of the GNU Affero General Public License along with WebDarts. If not, see <https://www.gnu.org/licenses/>. 

import { Link, Route } from 'wouter'

import { categories, gamesByCat } from "../../config/games"
import useTranslation from '\.\./\.\./hooks/i18n'
import useGlobalState from '../../hooks/useGlobalState'
import Button from '../common/Button'


const GameSelect = props => {

    const {
        t
    } = useTranslation()

    const [players] = useGlobalState('players')

    return <div className="px-2 py-4 h-full flex flex-col justify-center">

        <h2 className="text-4xl uppercase text-white font-semibold text-center mb-4">
            {t`choose-game`}
        </h2>
        <Route path="/game-selection/">
            <ul className="px-4 mb-4 space-y-8">
                {categories.map(game => <li>
                    <Link key={game.value} href={`/game-selection/${game.value}`}>
                        <Button color={game.colorClass} size="big" rounded full>
                            {game.label}
                        </Button>
                    </Link>
                </li>)}
            </ul>
        </Route>
        <Route path="/game-selection/:id">
            {params => <ul className="px-4 mb-4 space-y-4 mb-4">
                {gamesByCat[params.id].map(g => <li>
                    <Link key={g.value} href={`/game/${g.value}`}>
                        <Button
                            rounded
                            color="green"
                            size="small"
                            full
                            disabled={g.minPlayers > players.length}
                        >
                            {t(g.label)}
                        </Button>
                    </Link>
                </li>)}
            </ul>}
        </Route>

    </div>
}

export default GameSelect
