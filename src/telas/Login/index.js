import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { Alerta } from "../../componentes/Alerta";
import Botao from "../../componentes/Botao";
import { EntradaTexto } from "../../componentes/EntradaTexto";
import { auth } from "../../config/firebase";
import { logar } from "../../servicos/requisicoesFirebase";
import styles from "./styles";

import animacaoCarregando from "../../../assets/animacaoCarregando.gif";

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [statusError, setStatusError] = useState("");
    const [messageError, setMessageError] = useState("");
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const estadoUsuario = auth.onAuthStateChanged((usuario) => {
            if (usuario) {
                navigation.replace("Principal");
            }
            setCarregando(false);
        });
        return () => estadoUsuario();
    }, []);

    async function realizarLogin() {
        if (email == "") {
            setMessageError("O e-mail é obrigatório");
            setStatusError("email");
        } else if (senha == "") {
            setMessageError("A senha é obrigatório");
            setStatusError("senha");
        } else {
            const resultado = await logar(email, senha);
            if (resultado == "Erro") {
                setStatusError("firebase");
                setMessageError("E-mail ou Senha não conferem");
            } else {
                navigation.replace("Principal");
            }
        }
    }

    if (carregando) {
        return (
            <View style={styles.containerAnimacao}>
                <Image source={animacaoCarregando} style={styles.imagem} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <EntradaTexto
                label="E-mail"
                value={email}
                onChangeText={(texto) => setEmail(texto)}
                error={statusError == "email"}
                messageError={messageError}
            />
            <EntradaTexto
                label="Senha"
                value={senha}
                onChangeText={(texto) => setSenha(texto)}
                secureTextEntry
                error={statusError == "senha"}
                messageError={messageError}
            />

            <Alerta
                mensagem={messageError}
                error={statusError == "firebase"}
                setError={setStatusError}
            />

            <Botao onPress={() => realizarLogin()}>LOGAR</Botao>
            <Botao
                onPress={() => {
                    navigation.navigate("Cadastro");
                }}
            >
                CADASTRAR USUÁRIO
            </Botao>
        </View>
    );
}
