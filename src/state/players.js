


export const playerReducer = (players=[], action) => {
    const { payload, type } = action
    switch(type){
        case 'add_player':
            return [
                ...players,
                {
                    id: `player-${Date.now()}`,
                    ...payload
                }
            ]
        case 'update_player':
            return players.map(player => player.id === payload.id
                ? {
                    ...player,
                    ...payload
                }
                : player
            )
        case 'remove_player':
            return players.filter(p => p.id !== payload.id)
        default:
            return players
    }
}