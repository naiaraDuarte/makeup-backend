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

        if (!alterar) {
            pedido.produtos.forEach(async pdt => {
                let qntdeEstoque = await produtoDao.consultarComId(pdt);
                let qtdeEstoque = Object.assign(new Produto(), qntdeEstoque[0]);
                pedido.produtos.forEach(async pdt => {
                    let qntdeEstoque = await produtoDao.alterarEstoque(pdt);
                });
            });
            
        } 
        console.log(pedido)
        if (pedido.produtos != null) {                 
                let qntdeEstoque = await produtoDao.consultarComId(pedido.produtos[0]);
                let qtdeEstoque = Object.assign(new Produto(), qntdeEstoque[0]);
                let estoque = await produtoDao.alterar(pedido.produtos[0]);
                }            
            
        
        return null!
    }
    

}
