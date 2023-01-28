import { useState } from "react";
import { View } from "react-native";
import { EntradaTexto } from "../../componentes/EntradaTexto";
import { salvarProduto } from "../../servicos/firestore";
import Botao from "../../componentes/Botao";
import { Alerta } from "../../componentes/Alerta";
import styles from "./styles";

export default function DadosProdutos({ navigation }) {
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [mostrarMensagem, setMostrarMensagem] = useState(false);

    async function salvar() {
        if (nome == "" || preco == "") {
            setMensagem("Por favor preencha todos os campos");
            setMostrarMensagem(true);
            return;
        }

        const resultado = await salvarProduto({ nome, preco });
        if (resultado == "erro") {
            setMensagem("Erro ao salvar produto");
            setMostrarMensagem(true);
        } else {
            navigation.goBack();
        }
    }

    return (
        <View style={styles.container}>
            <EntradaTexto
                label="Nome do produto"
                value={nome}
                onChangeText={(texto) => setNome(texto)}
            />
            <EntradaTexto
                label="Preço do produto"
                value={preco}
                onChangeText={(texto) => setPreco(texto)}
            />

            <Botao onPress={() => salvar()}>SALVAR</Botao>

            <Alerta
                mensagem={mensagem}
                error={mostrarMensagem}
                setError={setMostrarMensagem}
            />
        </View>
    );
}
