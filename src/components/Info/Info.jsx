import "./Info.css";

/**
 * Renders the info component
 * @returns {JSX.Element}
 */
function Info() {
    return (
        <div className="instructions">
            <h2 className="how-to-play-title">How to play</h2>
            <ul className="instruction-list">
                <li className="instruction-list-item">Press the Start button to play.</li>
                <li className="instruction-list-item">Click with the mouse on the highlighted colour.</li>
                <li className="instruction-list-item">If it is correct, you get another colour. Remember the sequence and reproduce it again in each level.</li>
                <li className="instruction-list-item">If you make a mistake, go back to step 1 to restart the game.</li>
            </ul>
        </div>
    )
}

export default Info;