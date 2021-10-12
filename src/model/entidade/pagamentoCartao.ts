import Cartao from "./cartao.model";
import EntidadeDominio from "./entidadeDominio";
import Pagamento from "./pagamento";

export default class PagamentoCartao extends EntidadeDominio{
    cartao!: Cartao;
    pagamento!: Pagamento;  

}