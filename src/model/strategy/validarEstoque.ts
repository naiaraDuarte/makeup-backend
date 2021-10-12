import EntidadeDominio from "../entidade/entidadeDominio";
import IStrategy from "./IStrategy";
import Pedido from "../entidade/pedido";
import ProdutoDAO from "../dao/ProdutoDAO";
import Produto from "../entidade/produto";
import Fachada from "../../control/Fachada";

export default class ValidarEstoque implements IStrategy {
    async processar(entidade: EntidadeDominio, alterar: boolean): Promise<string> {
        const pedido = entidade as Pedido;
        let produtoDao = new ProdutoDAO();
        // let msgn = "";

        if (alterar == false) {
            pedido.produtos.forEach(async pdt => {
                let qntdeEstoque = await produtoDao.consultarComId(pdt);
                let qtdeEstoque = Object.assign(new Produto(), qntdeEstoque[0]);
                console.log("pdt", qtdeEstoque.quantidade)
                
                // if (pdt.quantidade > qtdeEstoque.quantidade) {
                //     msgn = "Produto sem estoque"
                //     console.log("if estoque", msgn)
                //     return msgn
                // }
                // else {
                    pedido.produtos.forEach(async pdt => {
                        let qntdeEstoque = await produtoDao.alterarEstoque(pdt);                    
                        
                //     });
    
                // }
            });
        });
        }
        return null!

    }
}
