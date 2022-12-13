// This file is part of WebDarts.
// WebDarts is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// WebDarts is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
// You should have received a copy of the GNU Affero General Public License along with WebDarts. If not, see <https://www.gnu.org/licenses/>. 

import { useState } from 'preact/hooks'
import clsx from 'clsx'
import { useLocation } from 'wouter'

import useTranslation from '../../../hooks/i18n'
import DescriptionList from '../../common/DescriptionList'
import DartButton from '../common/DartButton'
import DartKeyboard from '../common/DartKeyboard'
import WinnerModal from '../common/WinnerModal'

const PlayerDisplay = props => {

    const {
        name,
        selected,
        score
    }= props

    return <div className={clsx(
        'rounded-lg h-24 shadow-lg bg-emerald-600 text-white flex flex-col justify-center',
        {
            'ring-2 ring-yellow-500 ring-offset-2 ring-offset-transparent': selected
        }
    )}>
        <p className="text-xl font-semibold text-center text-gray-300">
            {name}
        </p>
        <p className="text-2xl font-semibold text-center">
            {score}
        </p>
    </div>
}

const X01Game = props => {

    const {
        players,
        max,
        zap
    } = props

    const [gameState, setGameState] = useState({
        scores: players.reduce((s, p) => {
            s[p.id] = max
            return s
        }, {}),
        turns: []
    })
    
    const { t } = useTranslation()

    const [, navigate] = useLocation()
    
    const reset  = () => {
        setGameState({
            turns: []
        })
    }

    const [keyboardOpen, setKeyboardOpen] = useState(false)


    const currentPlayerIndex = gameState.turns.length % players.length
    const currentPlayer = players[currentPlayerIndex]

    const handleScore = data => {
        const previousScore = gameState.scores[currentPlayer.id]
        const nextScore = previousScore-data.score
        const score = nextScore < 0
            ? previousScore
            : nextScore

        const scores = {
            ...gameState.scores,
            [currentPlayer.id]: score
        }

        if(zap){
            const zapped = players.filter(p => p.id !== currentPlayer.id)
                .find(p => scores[p.id] === score)
            if(zapped){
                scores[zapped.id] = max
            }
        }
        setGameState({
            ...gameState,
            scores,
            turns: [
                ...gameState.turns,
                {
                    player: currentPlayer.id,
                    data
                }
            ]
        })
        setKeyboardOpen(false)
    }


    const checkWinner = () => {
        const winner = players.find(p => gameState.scores[p.id] === 0)
        return winner
    }

    const winner = checkWinner()

    return <div className="py-4 px-2 h-full relative">

        <h2 className="text-5xl text-center mb-4 font-bold text-white">
            {t(`${max}${zap ? '-zap' : ''}`)}
        </h2>
        
        <ul className="grid grid-cols-2 gap-2 mb-6">
            {players.map(player => <PlayerDisplay
                key={player.id}
                selected={player.id === currentPlayer.id}
                score={gameState.scores[player.id]}
                name={player.name}
            />)}
        </ul>

        <div className="relative z-50">

            {winner && <WinnerModal 
                text={t('player-won', winner.name)}
                onRestart={reset}
                onExit={() => navigate('/')}
            />}
        </div>

        <DescriptionList
            items={[{
                title: t`turn`,
                description: 1+Math.floor(gameState.turns.length/players.length)
            }, {
                title: t`player`,
                description: currentPlayer.name
            }, {
                title: t`score`,
                description: gameState.scores[currentPlayer.id]
            }]}
        />

        <DartKeyboard
            open={keyboardOpen}
            onSubmit={handleScore}
            onExit={() => setKeyboardOpen(false)}
        />

        <DartButton
            onClick={() => setKeyboardOpen(!keyboardOpen)}
            disabled={!!winner}
        />
    </div>

}

export default X01Game
