import Cliente from "./cliente.model";
import Endereco from "./endereco";
import EntidadeDominio from "./entidadeDominio";
import Pagamento from "./pagamento";
import produto from "./produto";

export default class Pedido extends EntidadeDominio{
    produtos!: Array<produto>;
    cliente!: Cliente;
    endereco!: Endereco;
    pagamento!: Pagamento;
    status!: string;
    valor!: Number;
    frete!: Number;
}