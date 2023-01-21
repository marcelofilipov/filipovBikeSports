import { useState } from "react";
import { View } from "react-native";
import { Alerta } from "../../componentes/Alerta";
import Botao from "../../componentes/Botao";
import { EntradaTexto } from "../../componentes/EntradaTexto";
import styles from "./styles";
import { cadastrar } from "../../servicos/requisicoesFirebase";
import { alteraDados, verificaSeTemEntradaVazia } from "../../utils/comum";
import { entradas } from "./inputs";

export default function Cadastro({ navigation }) {
    const [dados, setDados] = useState({
        email: "",
        senha: "",
        confirmaSenha: "",
    });

    const [statusError, setStatusError] = useState("");
    const [messageError, setMessageError] = useState("");

    function verificaSeSenhasSaoIguais() {
        return dados.senha != dados.confirmaSenha;
    }

    async function realizarCadastro() {
        if (verificaSeTemEntradaVazia(dados, setDados)) return;

        if (dados.senha != dados.confirmaSenha) {
            setStatusError(true);
            setMessageError("As senhas não conferem");
            return;
        }

        const resultado = await cadastrar(dados.email, dados.senha);
        if (resultado != "Sucesso") {
            setStatusError(true);
            setMessageError(resultado);
        }
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
                        error={
                            entrada.name != "confirmaSenha"
                                ? false
                                : verificaSeSenhasSaoIguais() &&
                                  dados.confirmaSenha != ""
                        }
                    />
                );
            })}

            <Alerta
                mensagem={messageError}
                error={statusError}
                setError={setStatusError}
                tempo={2500}
            />

            <Botao onPress={() => realizarCadastro()}>CADASTRAR</Botao>
        </View>
    );
}
