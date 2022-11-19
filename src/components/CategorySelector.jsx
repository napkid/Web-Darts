import React from 'react'
import availableGames from '../config/games'


const CategorySelector = props => {

    const  {
        onSubmit
    } = props

    return <ul>
        {availableGames.map(cat => <li>
            <button
                onClick={() => onSubmit(cat.value)}
                className="text-xl"
            >
                {cat.label}
            </button>
        </li>)}
    </ul>
}

export default CategorySelector