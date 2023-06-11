import { StyleSheet, Text } from "react-native";

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
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 5,
      },
});

export default BoldText;