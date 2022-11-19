import React, { useState } from 'react'
import TeamSelector from "./TeamSelector.jsx"


const GameContainer = props => {
    const {
        game,
        players
    } = props

    const Game = game.component

    const [teams, setTeams] = useState(null)


    
    return (!teams && game.teams)
        ? <TeamSelector
            players={players}
            teamSettings={game.teams}
            onSubmit={setTeams}
        />
        : <Game
            {...game.props}
            teams={teams}
            players={players}
        />
}

export default GameContainer
