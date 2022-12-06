import { useState, useEffect } from 'preact/hooks'
import { useLocation } from 'wouter'

import { useTranslation } from '../../hooks/i18n.jsx'
import { useGlobalState } from '../../hooks/useGlobalState.jsx'
import PlayerForm from "../PlayerForm.jsx"

const PlayerSelect = props => {
    
    const { t } = useTranslation()

    const [players, dispatch] = useGlobalState('players')

    const [, setLocation] = useLocation()

    const addPlayer = player => {
        setPlayerName('')
        dispatch({
            type: 'add_player',
            payload: player
        })
    }

    const removePlayer = player => {
        dispatch({
            type: 'remove_player',
            payload: player
        })
    }

    const updatePlayer = player => {
        dispatch({
            type: 'update_player',
            payload: player
        })
    }

    const handleNext = () => {
            if(playerName !== ''){
                addPlayer({
                    name: playerName
                })
            }
            setLocation('/game-selection/')
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
                onChange={name => updatePlayer({
                    ...player,
                    name
                })}
                onRemove={() => removePlayer(player)}
            />)}
            <PlayerForm
                name={playerName}
                autoFocus
                onChange={name => setPlayerName(name)}
                onSubmit={() => addPlayer({
                    name: playerName
                })}
            />
        </ul>

        <div className="absolute bottom-0 py-4">
            <button
                onClick={handleNext}
                className="px-4 py-2 bg-emerald-500 font-semibold text-white rounded-lg"
            >
                {t`choose-game`}
            </button>
        </div>
    </div>
}

export default PlayerSelect
