import EntidadeDominio from "../entidade/entidade.model";
import IStrategy from "./IStrategy";
import Pedido from "../entidade/pedido";
import ProdutoDAO from "../dao/ProdutoDAO";
import Produto from "../entidade/produto";

export default class ValidarEstoque implements IStrategy {
    processar(entidade: EntidadeDominio): string {
        const pedido = entidade as Pedido;
        


        pedido.produtos.forEach(async pdt => {
            let produtoDAO = new ProdutoDAO();
            let qntdeEstoque = await produtoDAO.consultarComId(pdt);   
            // let conversao = Object.assign(new Produto(), qntdeEstoque);
            let produto = qntdeEstoque[0];
            let qtdeEstoque = Object.assign(new Produto(), produto);
            console.log("estoque atual", qtdeEstoque.quantidade);
            console.log ('vendido', pdt.quantidade);
            
            if (pdt.quantidade > qtdeEstoque.quantidade)
            //como comparar isso??
                return "produto sem estoque"
            else if (pdt.quantidade <= qtdeEstoque.quantidade){
                //adicionar função pra atualizar o estoque                
                return ""
            }


              

        // pedido.produtos.forEach(async pdt => {
        //     let produtoDAO = new ProdutoDAO();
        //     let produtoEstoque = await produtoDAO.consultarComId(pdt);
            
        //     let qntde = pdt.quantidade;

       
            
        });       
        
        return "";

    }
}
