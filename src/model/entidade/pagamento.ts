import Cartao from "./cartao.model";
import Cashback from "./cashback";
import Cliente from "./cliente.model";
import Cupom from "./cupom";
import EntidadeDominio from "./entidade.model";


export default class Pagamento extends EntidadeDominio{
    cliente!: Cliente;
    cartao!: Array<Cartao>;
    cupom!: Cupom;
    cashback!: Cashback;    

}