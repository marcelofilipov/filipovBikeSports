import { useState } from "react";
import { View } from "react-native";
import { Alerta } from "../../componentes/Alerta";
import Botao from "../../componentes/Botao";
import { EntradaTexto } from "../../componentes/EntradaTexto";
import styles from "./styles";
import { cadastrar } from "../../servicos/requisicoesFirebase";
import { alteraDados } from "../../utils/comum";

export default function Cadastro({ navigation }) {
    const [dados, setDados] = useState({
        email: "",
        senha: "",
        confirmaSenha: "",
    });

    const [statusError, setStatusError] = useState("");
    const [messageError, setMessageError] = useState("");

    async function realizarCadastro() {
        if (dados.email == "") {
            setMessageError("Preencha com seu e-mail");
            setStatusError("email");
        } else if (dados.senha == "") {
            setMessageError("Digite sua senha");
            setStatusError("senha");
        } else if (dados.confirmaSenha == "") {
            setMessageError("Confirme sua senha");
            setStatusError("confirmaSenha");
        } else if (dados.confirmaSenha != dados.senha) {
            setMessageError("As senhas não conferem");
            setStatusError("confirmaSenha");
        } else {
            const resultado = await cadastrar(dados.email, dados.senha);
            setStatusError("firebase");
            if (resultado == "Sucesso") {
                setMessageError("Usuário criado com sucesso!");
            } else {
                setMessageError(resultado);
            }
        }
    }

    return (
        <View style={styles.container}>
            <EntradaTexto
                label="E-mail"
                value={dados.email}
                onChangeText={(val) =>
                    alteraDados("email", val, dados, setDados)
                }
                error={statusError == "email"}
                messageError={messageError}
            />
            <EntradaTexto
                label="Senha"
                value={dados.senha}
                onChangeText={(val) =>
                    alteraDados("senha", val, dados, setDados)
                }
                secureTextEntry
                error={statusError == "senha"}
                messageError={messageError}
            />
            <EntradaTexto
                label="Confirmar Senha"
                value={dados.confirmaSenha}
                onChangeText={(val) =>
                    alteraDados("confirmaSenha", val, dados, setDados)
                }
                secureTextEntry
                error={statusError == "confirmaSenha"}
                messageError={messageError}
            />

            <Alerta
                mensagem={messageError}
                error={statusError == "firebase"}
                setError={setStatusError}
                tempo={2500}
            />

            <Botao onPress={() => realizarCadastro()}>CADASTRAR</Botao>
        </View>
    );
}
