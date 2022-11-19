import React, { useState } from 'react'
import clsx from "clsx"
import DartKeyboard from "../../DartKeyboard.jsx"
import GameBoard from "./GameBoard.jsx"
import DescriptionList from '../../DescriptionList.jsx'
import { useTranslation } from '../../../config/i18n.jsx'
import DartButton from '../../DartButton.jsx'
import WinnerModal from '../../WinnerModal.jsx'


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
        .map((r, rowIdx) => r.map((n, colIdx) => ({
            value: startNumber+3*rowIdx+colIdx,
            shots: {
                circle: 0,
                cross: 0
            }
        })))
})

const TicTacToeGame = props => {
    const startNumber = 1

    // const {
    //     teams
    // } = props

    const teams = props.teams
    

    const [gameState, setGameState] = useState(getInitialGameState(startNumber))

    const [keyboardOpen, setKeyboardOpen] = useState(false)

    const {t} = useTranslation()

    const currentTeam = teams[gameState.turnCount % teams.length]
    const currentPlayerIndex = Math.floor(gameState.turnCount/teams.length) % currentTeam.players.length
    const currentPlayer = currentTeam.players[currentPlayerIndex]


    const handleScore = (data) => {
        setKeyboardOpen(false)
        setGameState({
            ...gameState,
            turnCount: gameState.turnCount+1,
            board: data.shots.reduce((state, shot) => {
                return state.map(row => row.map(col => col.value === shot
                    ? {
                        ...col,
                        shots: {
                            ...col.shots,
                            [currentTeam.id]: col.shots[currentTeam.id]+1
                        }
                    }
                    : col
                ))
            }, gameState.board.slice())
        })
    }

    const reset = () => setGameState(getInitialGameState(startNumber))


    const checkWinner = () => ['cross', 'circle'].find(symbol => {
        const completedBoxes = gameState.board
            .flatMap(row => row)
            .map((box, idx) => box.shots[symbol] >= 3 ? idx : null)
        return winningCombinations
            .findIndex(combination => combination
                .every(boxIdx => completedBoxes.includes(boxIdx))
            ) >= 0
    })

    const winner = checkWinner()

    return <div className="px-2 py-4 h-full relative">

        <div className="mt-4">

            <GameBoard 
                state={gameState.board}
            />
        </div>

        <div className="mt-4">


            {winner && <WinnerModal 
                text={t('team-win', t(winner))}
                onRestart={reset}
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
            onSubmit={handleScore}
            onExit={() => setKeyboardOpen(false)}
        />
    </div>
}

export default TicTacToeGame