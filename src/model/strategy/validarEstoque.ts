import EntidadeDominio from "../entidade/entidade.model";
import IStrategy from "./IStrategy";
import Pedido from "../entidade/pedido";
import ProdutoDAO from "../dao/ProdutoDAO";
import Produto from "../entidade/produto";

export default class ValidarEstoque implements IStrategy {
    processar(entidade: EntidadeDominio): string {
        const pedido = entidade as Pedido;
        let msgn = "";


        pedido.produtos.forEach(async pdt => {
            let produtoDAO = new ProdutoDAO();
            let qntdeEstoque = await produtoDAO.consultarComId(pdt);
            let qtdeEstoque = Object.assign(new Produto(), qntdeEstoque[0]);
            console.log("estoque atual", qtdeEstoque.quantidade);
            console.log('vendido', pdt.quantidade);

            if (pdt.quantidade < qtdeEstoque.quantidade) {
                msgn = "Produto sem estoque"
                return msgn
            }
        });

        return msgn;

    }
}
