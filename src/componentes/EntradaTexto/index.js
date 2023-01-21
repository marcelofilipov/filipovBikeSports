import { useState } from "react";
import { TextInput, HelperText } from "react-native-paper";
import styles from "./styles";

export function EntradaTexto({
    label,
    value,
    onChangeText,
    secureTextEntry,
    error,
    messageError,
}) {
    const [secureMode, setSecureMode] = useState(secureTextEntry);

    const showError = value == null || error;

    return (
        <>
            <TextInput
                label={label}
                value={value}
                error={showError}
                secureTextEntry={secureMode}
                onChangeText={onChangeText}
                style={styles.input}
                mode="outlined"
                activeOutlineColor="#0E6BA8"
                right={
                    secureTextEntry ? (
                        <TextInput.Icon
                            name={secureMode ? "eye-off" : "eye"}
                            onPress={() => setSecureMode(!secureMode)}
                        />
                    ) : null
                }
            />
            {showError && (
                <HelperText type="error" visible={showError}>
                    {messageError}
                </HelperText>
            )}
        </>
    );
}
