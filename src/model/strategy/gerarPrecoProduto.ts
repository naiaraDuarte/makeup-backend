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

        if (!altera) {
            console.log(produto.categoria)           
            let mgLucro = produto.categoria.gpPrecificacao / 100
            console.log(mgLucro)
            mgLucro = (mgLucro * produto.custo)
            produto.preco = mgLucro + produto.custo
            console.log("ss", produto.preco);
        }
        else {
            if (produto.observacao == null) {
                let categoriaDao = new CategoriaDAO();
                let cat: any;
                let categoria = await categoriaDao.consultarComId(produto)
                cat = categoria[0]
                produto.preco = ((cat.gp_precificacao / 100) + produto.custo) + produto.custo                
                produto.categoria =  Object.assign(new Categoria(), cat);                
            }
        }
        return null!
    }
}