import { useState } from "react";
import { View } from "react-native";
import { EntradaTexto } from "../../componentes/EntradaTexto";
import Botao from "../../componentes/Botao";
import styles from "./styles";

export default function DadosProdutos() {
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
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

            <Botao onPress={() => {}}>SALVAR</Botao>
        </View>
    );
}
