import EntidadeDominio from "../entidade/entidadeDominio";
import IStrategy from "./IStrategy";
import Pedido from "../entidade/pedido";
import ProdutoDAO from "../dao/ProdutoDAO";


export default class ValidarEstoque implements IStrategy {
    async processar(entidade: EntidadeDominio, alterar: boolean): Promise<string> {
        const pedido = entidade as Pedido;
        let produtoDao = new ProdutoDAO();
        // let msgn = "";

        if (!alterar) {
         
            pedido.produtos.forEach(async pdt => {               
                    let qntdeEstoque = await produtoDao.alterarEstoque(pdt);
                });
        
            return null!;
        }
        // if (pedido.status == "TROCA EFETUADA" || pedido.status == "CANCELAMENTO EFETUADO"){
        //     let estoque = await produtoDao.alterar(pedido.produtos[0]);
        // }
        return null!
        
    }


}
