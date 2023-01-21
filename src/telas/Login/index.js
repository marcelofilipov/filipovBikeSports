import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { Alerta } from "../../componentes/Alerta";
import Botao from "../../componentes/Botao";
import { EntradaTexto } from "../../componentes/EntradaTexto";
import { auth } from "../../config/firebase";
import { logar } from "../../servicos/requisicoesFirebase";
import styles from "./styles";
import { alteraDados } from "../../utils/comum";
import { entradas } from "./inputs";

import animacaoCarregando from "../../../assets/animacaoCarregando.gif";

export default function Login({ navigation }) {
    const [dados, setDados] = useState({
        email: "",
        senha: "",
    });

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
        if (dados.email == "") {
            setMessageError("O e-mail é obrigatório");
            setStatusError("email");
        } else if (dados.senha == "") {
            setMessageError("A senha é obrigatório");
            setStatusError("senha");
        } else {
            const resultado = await logar(dados.email, dados.senha);
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
            {entradas.map((entrada) => {
                return (
                    <EntradaTexto
                        key={entrada.id}
                        {...entrada}
                        value={dados[entrada.name]}
                        onChangeText={(valor) =>
                            alteraDados(entrada.name, valor, dados, setDados)
                        }
                    />
                );
            })}

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
