import { StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../styles/globalColors";
import BoldText from "../BoldText/BoldText";
import { hp, spH, spV, wp } from "../../utils/normalize";

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
        paddingVertical: spV(2),
        paddingHorizontal: spH(25),
        textAlign: 'center',
        backgroundColor: colors.primaryColor
    },
})

export default PrimaryButton;