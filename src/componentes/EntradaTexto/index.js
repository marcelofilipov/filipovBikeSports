import { useState } from 'react';
import { TextInput, HelperText } from 'react-native-paper';
import styles from './styles';

export function EntradaTexto({ label, value, onChangeText, secureTextEntry, error, messageError }) {
  const [secureMode, setSecureMode] = useState(secureTextEntry);

  return (
    <>
      <TextInput
        label={label}
        value={value}
        error={error}
        secureTextEntry={secureMode}
        onChangeText={onChangeText}
        style={styles.input}
        mode="outlined"
        activeOutlineColor='#0E6BA8'
        right={
          secureTextEntry ?
            <TextInput.Icon
              name={secureMode ? 'eye-off' : 'eye'}
              onPress={() => setSecureMode(!secureMode)}
            /> : null
        }
      />
      {error && <HelperText type="error" visible={error}>
        {messageError}
      </HelperText>}
    </>
  );
}
