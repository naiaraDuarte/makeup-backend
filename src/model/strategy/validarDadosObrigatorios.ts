import Cliente from "../entidade/cliente.model";
import EntidadeDominio from "../entidade/entidade.model";
import IStrategy from "./IStrategy";

export default class ValidarDadosObrigatorios implements IStrategy {
    processar(entidade: EntidadeDominio): string {
        const cliente = entidade as Cliente;
        
        let nome = cliente.nome;
        let dataNasc = cliente.dataNasc;
        let cpf = cliente.cpf;
        let tipoTelefone = cliente.tipoTelefone;
        let telefone = cliente.telefone;
        let sexo = cliente.sexo;
        let email = cliente.email;
        let senha = cliente.senha;

        if (nome == "" ||
            dataNasc == null ||
            cpf == "" ||
            tipoTelefone == null ||
            telefone == "" ||
            email == "" ||
            senha == "" ||
            sexo == null) {
            return "Todos os dados são obrigatorios! ";
        }
        return "";

    }

}