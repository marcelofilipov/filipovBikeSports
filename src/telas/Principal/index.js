import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { auth } from "../../config/firebase";
import { pegarProdutos } from "../../servicos/firestore";
import Cabecalho from "../../componentes/Cabecalho";
import Produto from "../../componentes/Produtos";
import { BotaoProduto } from "../../componentes/BotaoProduto";
import styles from "./styles";

export default function Principal({ navigation }) {
    const usuario = auth.currentUser;
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        async function carregarDadosProdutos() {
            const produtosFirestore = await pegarProdutos();
            setProdutos(produtosFirestore);
        }
        carregarDadosProdutos();
    }, []);

    function deslogar() {
        auth.signOut();
        navigation.replace("Login");
    }

    return (
        <View style={styles.container}>
            <Cabecalho logout={deslogar} />
            <Text style={styles.texto}>Usuário: {usuario.email}</Text>

            {produtos.map((produto) => {
                return (
                    <Produto
                        nome={produto.nome}
                        preco={produto.preco}
                        key={produto.id}
                    />
                );
            })}

            <BotaoProduto onPress={() => navigation.navigate("DadosProduto")} />
        </View>
    );
}
