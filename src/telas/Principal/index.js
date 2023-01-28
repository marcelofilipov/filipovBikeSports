import { useEffect, useState } from "react";
import {
    RefreshControl,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import { auth } from "../../config/firebase";
import { pegarProdutos } from "../../servicos/firestore";
import Cabecalho from "../../componentes/Cabecalho";
import Produto from "../../componentes/Produtos";
import { BotaoProduto } from "../../componentes/BotaoProduto";
import styles from "./styles";

export default function Principal({ navigation }) {
    const usuario = auth.currentUser;
    const [produtos, setProdutos] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        carregarDadosProdutos();
    }, []);

    async function carregarDadosProdutos() {
        setRefreshing(true);
        const produtosFirestore = await pegarProdutos();
        setProdutos(produtosFirestore);
        setRefreshing(false);
    }

    function deslogar() {
        auth.signOut();
        navigation.replace("Login");
    }

    return (
        <View style={styles.container}>
            <Cabecalho logout={deslogar} />
            <Text style={styles.texto}>Usuário: {usuario.email}</Text>

            <ScrollView
                style={{ width: "100%" }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={carregarDadosProdutos}
                    />
                }
            >
                {produtos?.map((produto) => {
                    return (
                        <TouchableOpacity
                            key={produto.id}
                            onPress={() =>
                                navigation.navigate("DadosProduto", produto)
                            }
                        >
                            <Produto
                                nome={produto.nome}
                                preco={produto.preco}
                            />
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            <BotaoProduto onPress={() => navigation.navigate("DadosProduto")} />
        </View>
    );
}
