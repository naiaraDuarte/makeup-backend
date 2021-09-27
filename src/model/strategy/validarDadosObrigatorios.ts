import Cliente from "../entidade/cliente.model";
import Endereco from "../entidade/endereco";
import EntidadeDominio from "../entidade/entidade.model";
import IStrategy from "./IStrategy";
import ValidarEndereco from "./validarEndereco";

export default class ValidarDadosObrigatorios implements IStrategy {
    async processar(entidade: EntidadeDominio): Promise<string> {
        const cliente = entidade as Cliente;
        // let validarEndereco = new ValidarEndereco();
        let msgn =  "";
        
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
        // let valida = false;
        // cliente.endereco.forEach(e => {   
        //     let msg;         
        //     let conversao = Object.assign(new Endereco(), e);
        //     msg = validarEndereco.processar(conversao)
        //     if(msg != "")
        //        valida = true;     
        // });
        // if (valida) {
        //     return "Todos os dados do endereço são obrigatorios"
        // }
        return msgn

    }

}