// This file is part of WebDarts.
// WebDarts is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// WebDarts is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
// You should have received a copy of the GNU Affero General Public License along with WebDarts. If not, see <https://www.gnu.org/licenses/>. 

import { useState } from 'preact/hooks'
import { useRoute } from 'wouter'
import { games } from '../../config/games.js'

import useGlobalState from '../../hooks/useGlobalState.js'
import TeamSelector from '../games/common/TeamSelector.jsx'


const GameContainer = () => {

    const [players] = useGlobalState('players')

    const [, params] = useRoute('/game/:name')
    const currentGame = games.find(g => g.value === params.name)

    const Game = currentGame.component

    const [teams, setTeams] = useState(null)

    return (!teams && currentGame.teams)
        ? <TeamSelector
            players={players}
            teamSettings={currentGame.teams}
            onSubmit={setTeams}
        />
        : <Game
            {...currentGame.props}
            teams={teams}
            players={players}
        />
}

export default GameContainer
