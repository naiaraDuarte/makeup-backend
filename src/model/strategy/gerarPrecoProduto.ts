import { createRegularExpressionLiteral } from "typescript";
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

       if(!altera){
        let custo = produto.custo
        let mgLucro = produto.categoria.gpPrecificacao

        produto.preco = (custo * mgLucro) + custo;
        console.log(produto.preco)
       }
       else{
           console.log("else")
           let categoriaDao= new CategoriaDAO();
           let cat: any;

           let categoria = await categoriaDao.consultarComId(produto)
           cat = categoria[0]            
           produto.preco = (cat.gp_precificacao * produto.custo)+ produto.custo
           console.log(produto.preco)
                   


       }
        
        return null!

    }

}