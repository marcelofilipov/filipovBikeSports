import { useState } from 'react';
import { View } from 'react-native';
import { Alerta } from '../../componentes/Alerta';
import Botao from '../../componentes/Botao';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import { logar } from '../../servicos/requisicoesFirebase';
import styles from './styles';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [statusError, setStatusError] = useState('');
    const [messageError, setMessageError] = useState('');

    async function realizarLogin() {
        if (email == '') {
            setMessageError('O e-mail é obrigatório');
            setStatusError('email');
        } else if (senha == '') {
            setMessageError('A senha é obrigatório');
            setStatusError('senha');
        } else {
            const resultado = await logar(email, senha);
            if (resultado == 'Erro') {
                setStatusError('firebase');
                setMessageError('E-mail ou Senha não conferem');
            } else {
                navigation.replace('Principal');
            }
        }
    }

    return (
        <View style={styles.container}>
            <EntradaTexto
                label="E-mail"
                value={email}
                onChangeText={texto => setEmail(texto)}
                error={statusError == 'email'}
                messageError={messageError}
            />
            <EntradaTexto
                label="Senha"
                value={senha}
                onChangeText={texto => setSenha(texto)}
                secureTextEntry
                error={statusError == 'senha'}
                messageError={messageError}
            />

            <Alerta
                mensagem={messageError}
                error={statusError == 'firebase'}
                setError={setStatusError}
            />

            <Botao onPress={() => realizarLogin()}>LOGAR</Botao>
            <Botao
                onPress={() => { navigation.navigate('Cadastro') }}
            >
                CADASTRAR USUÁRIO
            </Botao>
        </View>
    );
}
