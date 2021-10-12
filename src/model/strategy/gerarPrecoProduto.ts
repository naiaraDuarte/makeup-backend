import Cartao from "../entidade/cartao.model";
import EntidadeDominio from "../entidade/entidadeDominio";
import Produto from "../entidade/produto";
import IStrategy from "./IStrategy";

export default class GerarPrecoProduto implements IStrategy {
    async processar(entidade: EntidadeDominio): Promise<string> {
        const produto = entidade as Produto;
        let cat = produto.categoria.toString()
        console.log("cat", cat)

        switch (cat) {
            case "1":
                produto.preco = produto.custo * 3
                return null!
            case "2":
                produto.preco = produto.custo * 4
                return null!
            case "3":
                produto.preco = produto.custo * 4
                return null!
            case "4":
                produto.preco = produto.custo * 2
                return null!
            case "5":
                produto.preco = produto.custo * 5
                return null!
            default:
                return "Categoria inválida!!! "               
            
        }

    }

    }