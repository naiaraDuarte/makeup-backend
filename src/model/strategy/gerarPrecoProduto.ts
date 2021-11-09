import Fachada from "../../control/Fachada";
import CategoriaDAO from "../dao/CategoriaDAO";
import Cartao from "../entidade/cartao.model";
import Categoria from "../entidade/categoria";
import EntidadeDominio from "../entidade/entidadeDominio";
import Produto from "../entidade/produto";
import IStrategy from "./IStrategy";

export default class GerarPrecoProduto implements IStrategy {
    async processar(entidade: EntidadeDominio, altera: boolean): Promise<string> {
        const produto = entidade as Produto;
        console.log("gerer", produto)
                // let mgLucro = produto.categoria.gpPrecificacao
        const categoriaDao = new CategoriaDAO();      
             
          
        // let custo = produto.custo
        // if (!altera)
        // produto.preco = mgLucro * custo


        if (Object.keys(produto).length > 2) {
            let cat = await categoriaDao.consultarComId(produto as Produto)   
          
            // let cat = produto.categoria.toString()       

            switch (cat[0].id) {
                case 1:
                    produto.preco = produto.custo * 3
                    return null!
                case 2:
                    produto.preco = produto.custo * 4
                    return null!
                case 3:
                    produto.preco = produto.custo * 3
                    return null!
                case 4:
                    produto.preco = produto.custo * 2
                    return null!
                case 5:
                    produto.preco = produto.custo * 5
                    return null!
                case 6:
                    produto.preco = produto.custo * 5
                    return null!
                case 7:
                    produto.preco = produto.custo * 7
                    
                    return null!
                default:
                    return "Categoria inválida!!! "
            }

        }
        return null!

    }

}