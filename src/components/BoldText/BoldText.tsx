import { StyleSheet, Text } from "react-native";
import { fp, spV } from "../../utils/normalize";

function BoldText({ description, additionalStyles } : {description: string, additionalStyles?: object}) {
    return (
        <Text style={[styles.textStyle, {...additionalStyles}]}>
          {description}
        </Text>
    )
};

const styles = StyleSheet.create({
    textStyle: {
        fontWeight: 'bold',
        fontSize:fp(14),
        textAlign: 'center',
        marginVertical: spV(5),
      },
});

export default BoldText;