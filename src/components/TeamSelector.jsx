import React, { useState } from 'react'
import clsx from "clsx"
import useDraggable from "../hooks/useDraggable"
import { useTranslation } from '../hooks/i18n'


const PlayerDisplay = props => {
    const {
        name,
        onDrag,
        onDrop
    } = props

    const [ref, pressed] = useDraggable({
        onDrop: onDrop,
        onDragStart: onDrag
    })

    return <li
        ref={ref}
        className={clsx('touch-none w-full rounded-lg text-xl font-semibold shadow text-white bg-emerald-500 px-6 py-4 mb-2',
        {
            'pointer-events-none': pressed
        })}
    >
        {name}
    </li>
}


const TeamSelector = (props) => {

    const {
        teamSettings,
        players,
        onSubmit
    } = props

    const { t } = useTranslation()

    const [teams, setTeams] = useState(teamSettings.map(setting => ({
        id: setting.id,
        name: setting.name,
        players: []
    })))

    const [dragging, setDragging] = useState(false)
    const [zone, setZone] = useState(null)

    const handleDrop = (player) => {
        if(!dragging){
            return
        }
        if(zone){
            setTeams(teams.map(t => t.id === zone
                ? {
                    ...t,
                    players: t.players.includes(player)
                        ? t.players
                        : [...t.players, player]
                }
                : {
                    ...t,
                    players: t.players.filter(p => p.id !== player.id)
                }
            ))
        } else {
            setTeams(teams.map(t => ({
                ...t,
                players: t.players.filter(p => p.id !== player.id)
            })))
            
        }
        setDragging(false)
    }

    return <div className="relative select-none h-full">
        <div className="p-4">

            {teams.map(team => <div className="mb-4 border border-emerald-600 rounded-lg">
                <header className="shadow-lg rounded-t-lg bg-emerald-900 text-white py-2">
                    <h5 className="text-2xl font-semibold text-center">
                        {t(team.name)}
                    </h5>
                </header>
                <ul className={clsx('h-full bg-emerald-600 px-8 py-4 rounded-b-lg')}
                    onPointerEnter={() => setZone(team.id)}
                    onPointerLeave={() => setZone(null)}
                >
                    {team.players
                        .map(player => <>

                            <PlayerDisplay
                                onDrag={() => setDragging(true)}
                                onDrop={() => handleDrop(player)}
                                name={player.name}
                            />
                        </>)
                    }
                    {(
                        team.players.length === 0
                        || teams.reduce((c, t) => c+t.players.length, 0) < players.length
                    )
                        && <li className="h-12 border-2 border-dashed">
                    </li>}
                </ul>
            </div>)}
            
            <div className="mb-4 border border-emerald-600 rounded-lg">

                <header className="rounded-t-lg  bg-emerald-900 text-white py-2">
                    <h5 className="text-2xl font-semibold text-center">
                        {t`players`}
                    </h5>
                </header>
                <ul
                    className={clsx('h-full bg-emerald-600 px-8 py-4 rounded-b-lg')}
                    onPointerUp={() => handleDrop()}
                >
                    {players.filter(player => teams
                        .findIndex(team => team.players
                            .includes(player)
                        ) === -1
                    ).map(player => <PlayerDisplay
                        onDrag={() => setDragging(player)}
                        onDrop={() => handleDrop(player)}
                        name={player.name}
                    />)}
                </ul>
            </div>
        </div>

        <div className="absolute bottom-0 right-0 p-4 w-full text-right">
            <button
                disabled={!teams.every(t => t.players.length > 0)}
                onClick={() => onSubmit(teams)}
                className="shadow-lg bg-emerald-700 rounded-lg px-6 py-4 text-xl font-semibold text-white disabled:bg-gray-400">
                Validate
            </button>
        </div>

    </div>
}

export default TeamSelector
