import { Snackbar } from "react-native-paper";

export function Alerta({ mensagem, error = false, setError, tempo = 1500 }) {

    return (
        <Snackbar
            visible={error}
            onDismiss={() => setError(false)}
            duration={tempo}
            action={{
                label: "OK",
                onPress: () => setError(false)
            }}
        >
            {mensagem}
        </Snackbar>
    )
}
