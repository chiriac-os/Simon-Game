import { View, Text, FlatList } from 'react-native';

const styles = {}
/**
 * Renders the info component
 * @returns {JSX.Element}
 */
function Info() {
    const instructions = [
        "Press the Start button to play.",
        "Click with the mouse on the highlighted colour.",
        "If it is correct, you get another colour. Remember the sequence and reproduce it again in each level.",
        "If you make a mistake, go back to step 1 to restart the game."
    ]

    return (
        <View className="instructions">
            <Text style={styles.how_to_play_title}>How to play</Text>
            <FlatList
                data={instructions}
                renderItem={({ item }) => (
                    <Text style={styles.instruction_list_item}>{item}</Text>
                )}
                keyExtractor={(item, index) => index.toString()}
                style={styles.instruction_list}
            />
        </View>
    )
}

export default Info;