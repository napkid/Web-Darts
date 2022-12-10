import { useState } from 'preact/hooks'
import { useLocation } from 'wouter'
import useTranslation from '../../hooks/i18n.js'

import useGlobalState from '../../hooks/useGlobalState.js'
import Button from '../common/Button.jsx'
import PlayerForm from '../games/common/PlayerForm.jsx'

const PlayerSelect = () => {
    
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

    return <div className="px-2 py-4 flex flex-col justify-center">

        <h2 className="text-5xl font-semibold text-white text-center mb-8">
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

        <div className="px-2 mt-12 w-full bottom-0 py-4 mx-auto">
            <Button onClick={handleNext}
                full size="small" rounded color="blue"
            >
                {t`choose-game`}
            </Button>
        </div>
    </div>
}

export default PlayerSelect
