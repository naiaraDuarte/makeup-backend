import Cartao from "../entidade/cartao.model";
import EntidadeDominio from "../entidade/entidade.model";
import IStrategy from "./IStrategy";

export default class ValidarCartao implements IStrategy {
    processar(entidade: EntidadeDominio): string {
        const cartao = entidade as Cartao;

        let nome = cartao.nome;
        let numero = cartao.numero;
        let cvv = cartao.cvv;
        let dataValidade = cartao.data_validade;

        if (nome == "" || numero == "" || cvv == "" || dataValidade == "") {
            console.log("dentro da validação")
            return "dados do cartao são obrigatorios";            
        }
        return "";
    }

}