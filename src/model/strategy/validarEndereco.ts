import Endereco from "../entidade/endereco";
import EntidadeDominio from "../entidade/entidade.model";
import { TipoLogradouro } from "../entidade/tipoLogradouro";
import IStrategy from "./IStrategy";

export default class ValidarEndereco implements IStrategy {
    processar(entidade: EntidadeDominio): string {
        const endereco = entidade as Endereco;

        let nome = endereco.nome;
        let cep = endereco.cep;
        let logradouro = endereco.logradouro;
        let numero = endereco.numero;
        let bairro = endereco.bairro;
        let cidade = endereco.cidade;
        let uf = endereco.uf;
        let pais = endereco.pais;
        let tipoResidencia = endereco.tipoResidencia;
        let tipoLogradouro = endereco.tipoLogradouro;
        let tipoEndereco = endereco.tipoEndereco;


        if (nome == "" ||
            cep == "" ||
            logradouro == "" ||
            numero == "" ||
            bairro == "" ||
            cidade == "" ||
            uf == null ||
            pais == null || tipoResidencia == null|| tipoLogradouro == null || tipoEndereco == null) {
            return "Todos os campos de endereço são obrigatorios! ";
        }
        return "";
    }
    
}