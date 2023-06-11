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
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 25,
        minWidth: 80,
        maxHeight: 60,
        textAlign: 'center',
        backgroundColor: colors.primaryColor
    },
})

export default PrimaryButton;