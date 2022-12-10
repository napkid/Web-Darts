import { useState } from 'preact/hooks'
import clsx from 'clsx'
import { useLocation } from 'wouter'

import useTranslation from '../../../hooks/i18n'
import DescriptionList from '../../common/DescriptionList'
import DartButton from '../common/DartButton'
import DartKeyboard from '../common/DartKeyboard'

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
        max
    } = props

    const [gameState, setGameState] = useState({
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
        const previousScore = getPlayerScore(currentPlayer.id)
        const nextScore = previousScore-data.score
        const score = nextScore < 0
            ? 0
            : data.score
        setGameState({
            ...gameState,
            turns: [
                ...gameState.turns,
                {
                    player: currentPlayer.id,
                    data: {
                        ...data,
                        score
                    }
                }
            ]
        })
        setKeyboardOpen(false)
    }


    const getPlayerScore = (playerId) => {
        return max - gameState.turns
            .filter(t => t.player === playerId)
            .reduce((score, turn) => score+turn.data.score, 0)
    }

    const checkWinner = () => {
        const winner = players.find(p => getPlayerScore(p.id) === 0)
        return winner
    }

    const winner = checkWinner()

    return <div className="py-4 px-2 h-full relative">

        <h2 className="text-5xl text-center mb-4 font-bold text-white">
            {max}
        </h2>
        
        <ul className="grid grid-cols-2 gap-2 mb-6">
            {players.map(player => <PlayerDisplay
                key={player.id}
                selected={player.id === currentPlayer.id}
                score={getPlayerScore(player.id)}
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
                description: getPlayerScore(currentPlayer.id)
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
