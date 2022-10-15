import { View, Text } from 'react-native';
import Cabecalho from '../../componentes/Cabecalho';
import Produto from '../../componentes/Produtos';
import styles from './styles';

export default function Principal({ navigation }) {

    return (
        <View style={styles.container}>
            <Cabecalho navigation={navigation} />
            <Text style={styles.texto}>Usuário: teste@email.com</Text>

            <Produto nome="Sapatilha Shimano" preco="900,00" />
            <Produto nome="Selim Selle Italia" preco="1.200,00" />
            <Produto nome="Suplementos" preco="150,00" />
        </View>
    );
}
