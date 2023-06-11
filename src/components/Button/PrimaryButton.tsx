import { StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../styles/globalColors";
import BoldText from "../BoldText/BoldText";

function PrimaryButton({ text, onPress }) {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}>
            <BoldText
                description={text}
                additionalStyles={{ color: colors.white }}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: colors.primaryColor
    },
})

export default PrimaryButton;