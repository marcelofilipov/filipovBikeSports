import { useState } from "react";
import { Alert, View } from "react-native";
import { EntradaTexto } from "../../componentes/EntradaTexto";
import { salvarProduto } from "../../servicos/firestore";
import Botao from "../../componentes/Botao";
import styles from "./styles";

export default function DadosProdutos({ navigation }) {
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");

    async function salvar() {
        const resultado = await salvarProduto({ nome, preco });
        if (resultado == "erro") {
            Alert.alert("Erro ao criar produto");
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
        </View>
    );
}
