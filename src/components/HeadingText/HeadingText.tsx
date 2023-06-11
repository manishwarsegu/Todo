import { StyleSheet, Text } from "react-native";
import { colors } from "../../styles/globalColors";

function HeadingText({description}) {
    return (
        <Text style={styles.textStyle}>{description.toUpperCase()}</Text>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        color: colors.primaryColor,
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 1.5,
    }
})

export default HeadingText;