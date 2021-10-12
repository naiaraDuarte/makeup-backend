 import EntidadeDominio from "./entidadeDominio";
import Pedido from "./pedido";
import Produto from "./produto";

export default class ProdutoPedido extends EntidadeDominio{
    produto!: Produto;
    pedido!: Pedido;
    status!: string
}