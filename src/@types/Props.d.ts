import { GameState } from "./State";

/**
 * HEADERS
 */
export type HeaderProps = {
    game: GameState,
    setGame: React.Dispatch<React.SetStateAction<GameState>>,
    getLevel: () => number,
};

export type GameHeaderProps = {
    game: GameState,
    setShowGame: (prop: boolean) => React.Dispatch<React.SetStateAction<GameState>>,
    getLevel: () => number,
};

export type InfoHeaderProps = {
    game: GameState,
    setShowGame: (prop: boolean) => React.Dispatch<React.SetStateAction<GameState>>,
};

/**
 * GAME
 */
export type GameProps = {
    game: GameState,
    setGame: React.Dispatch<React.SetStateAction<GameState>>,
    getLevel: () => number,
    nextLevel: () => void,
    resetLevel: () => void,
}