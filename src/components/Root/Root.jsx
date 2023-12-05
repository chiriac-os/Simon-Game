import { useState, useMemo, useCallback } from "react";

import Header from "../Header/Header";
import Game from "../Game/Game";
import Info from "../Info/Info";

import { View } from 'react-native';

/**
 * Root function. This is the main component that handles the game or the info board by passing props.
 * @returns {JSX.Element}
 */
function Root() {
    /**
     * Hooks
     */
    const [game, setGame] = useState({
        show: true,
        started: false,
        over: false,
    })
    const [level, setLevel] = useState(0);

    /**
     * Level getter
     * @returns {number}
     */
    const getLevel = useMemo(() => {
        return level;
    }, [level]);

    /**
     * Increments the level
     */
    const nextLevel = useCallback(() => {
        setLevel((prevLevel) => prevLevel + 1);
    }, [level])

    /**
     * Sets the level to 0
     */
    const resetLevel = () => {
        setLevel(0);
    }

    const headerProps = { game, setGame, getLevel }
    const gameProps = { game, setGame, getLevel, nextLevel, resetLevel }

    return (
        <>
            <Header {...headerProps} />
            <View>
                {
                    game.show ? (
                        <Game {...gameProps} />
                    ) : (
                        <Info />
                    )
                }
            </View>
        </>
    )
}

export default Root;