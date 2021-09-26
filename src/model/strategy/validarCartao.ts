import Cartao from "../entidade/cartao.model";
import EntidadeDominio from "../entidade/entidade.model";
import IStrategy from "./IStrategy";

export default class ValidarCartao implements IStrategy {
    async processar(entidade: EntidadeDominio): Promise<string> {
        const cartao = entidade as Cartao;
        let msgn = "";
        let numero = cartao.numero;
        let nome = cartao.nome;
        let cvv = cartao.cvv;
        let data = cartao.data_validade
        let validarCartao = require('validador-cartao-credito');

        if (nome == "" || cvv == "" || data == "") {
            return "Campos de preenchimento obrigatorio!"
        }


        if (numero.length == 16) {
            if (validarCartao(numero)) {

                return ""
            }
        }
        return "Numero do cartao invalido"




    }

}