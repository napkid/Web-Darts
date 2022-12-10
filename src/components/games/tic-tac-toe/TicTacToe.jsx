// This file is part of WebDarts.
// WebDarts is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// WebDarts is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
// You should have received a copy of the GNU Affero General Public License along with WebDarts. If not, see <https://www.gnu.org/licenses/>. 

import { useState } from 'preact/hooks'
import { useLocation } from 'wouter'

import useTranslation from '../../../hooks/i18n'
import DescriptionList from '../../common/DescriptionList'
import DartButton from '../common/DartButton'
import DartKeyboard from '../common/DartKeyboard'
import WinnerModal from '../common/WinnerModal'
import GameBoard from './GameBoard'
import StartNumberPicker from './StartNumberPicker'

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const getInitialGameState = (startNumber) => ({
    turnCount: 0,
    board: Array(3).fill(Array(3).fill(null))
        .map((r, rowIdx) => r.map((n, colIdx) => {
            const value = startNumber+3*rowIdx+colIdx
            return ({
                value: value > 20 ? value - 20 : value,
                shots: {
                    circle: 0,
                    cross: 0
                }
            })
        }))
})

const TicTacToeGame = props => {

    const [gameState, setGameState] = useState(null)
    const handleStartNumber = n => {
        setGameState(getInitialGameState(n))
    }

    if(gameState === null){
        return <StartNumberPicker onPick={n => handleStartNumber(n)} />
    }

    const {
        teams
    } = props


    const [keyboardOpen, setKeyboardOpen] = useState(false)

    const [,navigate] = useLocation()
    const {t} = useTranslation()

    const currentTeam = teams[gameState.turnCount % teams.length]
    const currentPlayerIndex = Math.floor(gameState.turnCount/teams.length) % currentTeam.players.length
    const currentPlayer = currentTeam.players[currentPlayerIndex]


    const checkWinner = () => ['cross', 'circle'].find(symbol => {
        const completedBoxes = gameState.board
            .flatMap(row => row)
            .map((box, idx) => box.owner === symbol ? idx : null)
        return winningCombinations
            .findIndex(combination => combination
                .every(boxIdx => completedBoxes.includes(boxIdx))
            ) >= 0
    })


    const handleScore = (data) => {
        setKeyboardOpen(false)
        setGameState({
            ...gameState,
            turnCount: gameState.turnCount+1,
            board: data.shots.reduce((state, shot) => {
                return state.map(row => row.map(col => {
                    if(col.value !== shot){
                        return col
                    }
                    const shots = {
                        ...col.shots,
                        [currentTeam.id]: col.shots[currentTeam.id]+1
                    }

                    const owner = col.owner ?? ['cross', 'circle']
                        .find(team => shots[team] >= 3)
                        

                    return {
                            ...col,
                            owner,
                            shots
                        }
                }
                ))
            }, gameState.board.slice())
        })
    }

    const reset = () => setGameState(null)


    
    const winner = checkWinner()

   

    return <div className="px-2 py-4 h-full relative z-0 text-center">

        <h1 className="text-5xl mb-8">
            {t`tic-tac-toe`}
        </h1>

        <div className="mt-4 relative z-0">

            <GameBoard 
                state={gameState.board}
            />
        </div>

        <div className="mt-4  relative z-0">


            {winner && <WinnerModal 
                text={t('team-win', t(winner))}
                onRestart={reset}
                onExit={() => navigate('/')}
            />}

            <DescriptionList
                items={[{
                    title: t`turn`,
                    description: 1+Math.floor(gameState.turnCount/teams.length)
                }, {
                    title: t`team`,
                    description: t(currentTeam.name)
                },
                {
                    title: t`player`,
                    description: currentPlayer.name
                }]}
            />

        </div>

        <DartButton
            onClick={() => setKeyboardOpen(!keyboardOpen)}
            disabled={!!winner}
        />

        <DartKeyboard
            open={keyboardOpen}
            matrix={gameState.board.map(r => r.map(c => ({
                label: c.value,
                value: c.value,
                maxCount: 3
            })))}
            onSubmit={handleScore}
            onExit={() => setKeyboardOpen(false)}
        />
    </div>
}

export default TicTacToeGame
