import { auth } from '../config/firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    AuthErrorCodes
} from 'firebase/auth/react-native';

function errosFirebase(erro) {
    let mensagem = '';
    switch (erro.code) {
        case AuthErrorCodes.EMAIL_EXISTS:
            mensagem = 'Esse e-mail já está em uso';
            break;
        case AuthErrorCodes.INVALID_EMAIL:
            mensagem = 'E-mail inválido';
            break;
        case AuthErrorCodes.WEAK_PASSWORD:
            mensagem = 'A senha precisa de no mínimo 6 caracteres';
            break;
        default:
            mensagem = 'Erro desconhecido';
    }
    return mensagem;
}

export async function cadastrar(email, senha) {
    const resultado = await createUserWithEmailAndPassword(auth, email, senha)
        .then((dadosDoUsuario) => {
            console.log(dadosDoUsuario);
            return 'Sucesso';
        })
        .catch((error) => {
            console.log(error);
            return errosFirebase(error);
        });

    return resultado;
}

export async function logar(email, senha) {
    const resultado = await signInWithEmailAndPassword(auth, email, senha)
        .then((dadosDoUsuario) => {
            console.log(dadosDoUsuario);
            return 'Sucesso';
        })
        .catch((error) => {
            console.log(error);
            //return errosFirebase(error);
            return "Erro";
        });

    return resultado;
}
