import clsx from 'clsx'
import { useState } from 'preact/hooks'

import useTranslation from '../../../hooks/i18n'
import useDraggable from '../../../hooks/useDraggable'
import { blockStyle } from '../../../style'
import Button from '../../common/Button'


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
        className={clsx('relative z-50 touch-none w-full rounded-lg text-xl font-semibold shadow text-white bg-emerald-500 px-6 py-4 mb-2',
        {
            'pointer-events-none': pressed,
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

    return <div className="relative select-none min-h-full pb-12">
        <div className="p-4 text-center">

            <h1 className="text-5xl mb-8">
                {t`team-up`}
            </h1>

            {teams.map(team => <div key={team.id} className={clsx(
                'mb-4',
                blockStyle.base,
                blockStyle.rounded,
                blockStyle.colors.green
            )}>
                <div className="relative z-20">

                    <header className={clsx(
                        blockStyle.base,
                        blockStyle.rounded,
                        blockStyle.colors.green,
                        'shadow-lg rounded-t-lg bg-emerald-700 text-white py-2',
                    )}>
                        <h5 className="text-2xl font-semibold text-center">
                            {t(team.name)}
                        </h5>
                    </header>
                </div>
                <ul className={clsx('h-full bg-emerald-400 px-8 py-4 rounded-b-lg')}
                    onPointerEnter={() => setZone(team.id)}
                    onPointerLeave={() => setZone(null)}
                >
                    {team.players
                        .map(player => <>

                            <PlayerDisplay
                                key={player.id}
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
                        && <li className="h-12 border-2 border-dashed border-emerald-600 rounded-lg">
                    </li>}
                </ul>
            </div>)}
            
            <div className={clsx(
                blockStyle.base,
                blockStyle.rounded,
                blockStyle.colors.green,
                'mb-4'
            )}>

                <div className="relative z-20">

                    <header className={clsx(
                        blockStyle.base,
                        blockStyle.rounded,
                        blockStyle.colors.green,
                        'shadow-lg rounded-t-lg bg-emerald-700 text-white py-2',
                    )}>
                        <h5 className="text-2xl font-semibold text-center">
                        {t`players`}
                        </h5>
                    </header>
                </div>
                <ul
                    className={clsx('h-full bg-emerald-400 px-8 py-4 rounded-b-lg')}
                    onPointerUp={() => handleDrop()}
                >
                    {players.filter(player => teams
                        .findIndex(team => team.players
                            .includes(player)
                        ) === -1
                    ).map(player => <PlayerDisplay
                        key={player.id}
                        onDrag={() => setDragging(player)}
                        onDrop={() => handleDrop(player)}
                        name={player.name}
                    />)}
                </ul>
            </div>
            <div className="z-50 bottom-0 right-0 fixed w-full ">

                <div className="container max-w-md mx-auto p-4">
                    <Button
                        size="small"
                        color="blue"
                        full
                        rounded
                        disabled={!teams.every(t => t.players.length > 0)}
                        onClick={() => onSubmit(teams)}
                    >
                        {t`validate`}
                    </Button>
                </div>
            </div>
        </div>


    </div>
}

export default TeamSelector
