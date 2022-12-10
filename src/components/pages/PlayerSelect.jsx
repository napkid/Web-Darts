// This file is part of WebDarts.
// WebDarts is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// WebDarts is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
// You should have received a copy of the GNU Affero General Public License along with WebDarts. If not, see <https://www.gnu.org/licenses/>. 

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
