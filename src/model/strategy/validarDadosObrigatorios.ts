import Cliente from "../entidade/cliente.model";
import IStrategy from "./IStrategy";

export default class ValidarDadosObrigatorios implements IStrategy{
    processar(entidade: any): String {
      
        // let conversao = Object.assign(new Cliente(), cliente);

        //     String nome = cliente.getNome();
        //     String titulacao = professor.getTitulacao();
        //     String telefone = professor.getTelefone();
        //     String sexo = professor.getSexo();
        // if (nome == null || titulacao == null || telefone == null || sexo == null) {
        //     return "Todos os dados são obrigatorios";
        // } else if (nome.trim().equals("") || titulacao.trim().equals("") || telefone.trim().equals("") || sexo.trim().equals("")) {
        //     return "Todos os dados são obrigatorios";
        // }
        console.log("dentro da validação")
        return "validou";
    }
    
}