export const gameStart = () => {
    return new CustomEvent('game_start');
}

export const gameOver = () => {
    return new CustomEvent('game_over');
}

export const restart = () => {
    return new CustomEvent('game_restart');
}
