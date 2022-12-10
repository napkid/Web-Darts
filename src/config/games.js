import TicTacToeGame from "../components/games/tic-tac-toe/TicTacToe.jsx"
import X01Game from "../components/games/x01/X01Game.jsx"

export const categories = [{
    value: 'score',
    label: 'Score',
    colorClass: 'yellow'
    // component: ScoreGame,
}, {
    label: 'Cricket',
    value: 'cricket',
    colorClass: 'red'
    // component: null
}]

export const scoreGames = [{
    value: '301',
    label: '301',
    component: X01Game,
    minPlayers: 2,
    props: {
        max: 301
    }
}, {
    value: '501',
    label: '501',
    component: X01Game,
    minPlayers: 2,
    props: {
        max: 501
    }
}, {
    value: '701',
    label: '701',
    component: X01Game,
    minPlayers: 2,
    props: {
        max: 701
    }
}]

export const specialGames = [{
    label: 'tic-tac-toe',
    value: 'tic-tac-toe',
    component: TicTacToeGame,
    minPlayers: 2,
    teams: [{
        id: 'cross',
        name: 'cross'
    }, {
        id: 'circle',
        name: 'circle'
    }]
},
// {
//     label: 'Cricket',
//     minPlayers: 2,
//     value: 'cricket'
// }
]

export const gamesByCat = {
    'cricket': specialGames,
    'score': scoreGames 
}

export const games = [...scoreGames, ...specialGames]