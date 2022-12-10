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
