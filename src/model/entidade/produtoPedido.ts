 import EntidadeDominio from "./entidade.model";
import Pedido from "./pedido";
import Produto from "./produto";

export default class ProdutoPedido extends EntidadeDominio{
    produto!: Produto;
    pedido!: Pedido;  

}