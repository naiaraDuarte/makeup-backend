import Cliente from "../entidade/cliente.model";
import Endereco from "../entidade/endereco";
import EntidadeDominio from "../entidade/entidadeDominio";
import IStrategy from "./IStrategy";
import ValidarEndereco from "./validarEndereco";

export default class ValidarDadosObrigatorios implements IStrategy {
    async processar(entidade: EntidadeDominio): Promise<string> {
        const cliente = entidade as Cliente;                
        let nome = cliente.nome;
        let dataNasc = cliente.dataNasc;
        let cpf = cliente.cpf;
        let tipoTelefone = cliente.tipoTelefone;
        let telefone = cliente.telefone;
        let sexo = cliente.sexo;
        let email = cliente.email;
        let senha = cliente.senha;
        
        if(Object.values(cliente).length > 2){
            return null!
        }       
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
        return null!
    }
}