import React, { useState } from 'react'
import { useTranslation } from '../config/i18n.jsx'
import PlayerForm from "./PlayerForm.jsx"

const PlayerSelect = props => {

    const {
        onSubmit
    } = props
    
    const { t } = useTranslation()
    const [players, setPlayers] = useState(props.players || [])

    const changePlayerName = (id, name) => {
        setPlayers(players.map(player => player.id === id
            ? {
                ...player,
                name
            }
            : player
        ))
    }

    const addPlayer = (name) => {
        setPlayerName('')
        setPlayers([
            ...players,
            {
                id: `player-${Date.now()}`,
                name
            }
        ])
    }

    const handleRemove = id => {
        setPlayers(players.filter(p => p.id !== id))
    }

    const [playerName, setPlayerName] = useState('')

    return <div className="px-2 py-4 h-full flex flex-col justify-center">

        <h2 className="text-3xl font-semibold text-white text-center mb-4">
            {t`players`}
        </h2>

        <ul className="px-2 space-y-4">
            {players.map(player => <PlayerForm
                key={player.id}
                name={player.name}
                onChange={name => changePlayerName(player.id, name)}
                onRemove={() => handleRemove(player.id)}
            />)}
            <PlayerForm
                name={playerName}
                autoFocus
                onChange={name => setPlayerName(name)}
                onSubmit={() => addPlayer(playerName)}
            />
        </ul>

        <div className="absolute bottom-0 py-4">
            <button
                className="px-4 py-2 bg-blue-500 font-semibold text-white rounded-lg"
                onClick={() => onSubmit(players)}>
                Validate
            </button>
        </div>
    </div>
}

export default PlayerSelect
