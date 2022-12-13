// This file is part of WebDarts.
// WebDarts is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// WebDarts is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
// You should have received a copy of the GNU Affero General Public License along with WebDarts. If not, see <https://www.gnu.org/licenses/>. 

import TicTacToeGame from '../components/games/tic-tac-toe/TicTacToe.jsx'
import X01Game from '../components/games/x01/X01Game.jsx'

export const categories = [{
    value: 'score',
    label: 'Score',
    colorClass: 'yellow'
}, {
    label: 'Cricket',
    value: 'cricket',
    colorClass: 'red'
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
}, {
    value: '321-zap',
    label: '321-zap',
    component: X01Game,
    minPlayers: 2,
    props: {
        max: 321,
        zap: true
    }
}]

export const specialGames = [{
    label: 'tic-tac-toe',
    value: 'tic-tac-toe',
    component: TicTacToeGame,
    minPlayers: 2,
    minTeams: 2,
    maxTeams: 3,
    availableTeams: [{
        id: 'cross',
        name: 'cross'
    }, {
        id: 'circle',
        name: 'circle'
    }, {
        id: 'triangle',
        name: 'triangle'
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