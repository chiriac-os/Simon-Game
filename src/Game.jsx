function Game() {
    return (
        <>
            <h1 id="level-title">Press Start</h1>
            <div className="container">
                <div className="row">
                    <div type="button" id="green" className="btn green"></div>
                    <div type="button" id="red" className="btn red"></div>
                </div>

                <div className="row">
                    <div type="button" id="yellow" className="btn yellow"></div>
                    <div type="button" id="blue" className="btn blue"></div>
                </div>
            </div>

            <div className="row">
                <button className="start-button" type="button" value="Start">Start</button>
            </div>

            <div className="instructions">
                <h2 className="how-to-play-title">How to play</h2>
                <ol className="instruction-list">
                    <li className="instruction-list-item">Press the Start button to play.</li>
                    <li className="instruction-list-item">Click with the mouse on the highlighted colour.</li>
                    <li className="instruction-list-item">If it is correct, you get another colour. Remember the sequence and reproduce it again in each level.</li>
                    <li className="instruction-list-item">If you make a mistake, go back to step 1 to restart the game.</li>
                </ol>
            </div>
        </>
    )
}

export default Game;