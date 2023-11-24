import { GameState } from "./State";

/**
 * HEADERS
 */
type HeaderProps = {
    game: GameState,
    setGame: React.Dispatch<React.SetStateAction<GameState>>,
    getLevel: () => number,
};

type GameHeaderProps = {
    game: GameState,
    setShowGame: (prop: boolean) => React.Dispatch<React.SetStateAction<GameState>>,
    getLevel: () => number,
};

type InfoHeaderProps = {
    game: GameState,
    setShowGame: (prop: boolean) => React.Dispatch<React.SetStateAction<GameState>>,
};

/**
 * GAME
 */
type GameProps = {
    game: GameState,
    setGame: React.Dispatch<React.SetStateAction<GameState>>,
    getLevel: () => number,
    nextLevel: () => void,
    resetLevel: () => void,
}