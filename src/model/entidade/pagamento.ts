import Cartao from "./cartao.model";
import Cashback from "./cashback";
import Cliente from "./cliente.model";
import Cupom from "./cupom";
import EntidadeDominio from "./entidadeDominio";


export default class Pagamento extends EntidadeDominio{
    cliente!: Cliente;
    cartoes!: Array<Cartao>;
    cupom!: Cupom;
    cashback!: Cashback;    

}