import Cartao from "./cartao.model";
import EntidadeDominio from "./entidade.model";
import Pagamento from "./pagamento";

export default class PagamentoCartao extends EntidadeDominio{
    cartao!: Cartao;
    pagamento!: Pagamento;  

}