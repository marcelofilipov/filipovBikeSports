import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import Botao from '../../componentes/Botao';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import styles from './styles';
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth/react-native';
import { cadastrar } from '../../servicos/requisicoesFirebase';

export default function Cadastro({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [statusError, setStatusError] = useState('');
    const [messageError, setMessageError] = useState('');

    async function realizarCadastro() {
        if (email == '') {
            setMessageError('Preencha com seu e-mail');
            setStatusError('email');
        } else if (senha == '') {
            setMessageError('Digite sua senha');
            setStatusError('senha');
        } else if (confirmaSenha == '') {
            setMessageError('Confirme sua senha');
            setStatusError('confirmaSenha');
        } else if (confirmaSenha != senha) {
            setMessageError('As senhas não conferem');
            setStatusError('confirmaSenha');
        } else {
            setStatusError('');
            setMessageError('');

            const resultado = await cadastrar(email, senha);
            if (resultado == 'Sucesso') {
                Alert.alert('Usuário cadastro com sucesso!');
                setEmail('');
                setSenha('');
                setConfirmaSenha('');
            } else {
                Alert.alert(resultado);
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

            <EntradaTexto
                label="Confirmar Senha"
                value={confirmaSenha}
                onChangeText={texto => setConfirmaSenha(texto)}
                secureTextEntry
                error={statusError == 'confirmaSenha'}
                messageError={messageError}
            />

            <Botao onPress={() => realizarCadastro()}>CADASTRAR</Botao>
        </View>
    );
}
