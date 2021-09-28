import entidadeModel from "../entidade/entidade.model";
import Produto from "../entidade/produto";
import IDAO from "./IDAO";
import { db } from '../../db.config';
import EntidadeDominio from "../entidade/entidade.model";

export default class ProdutoDAO implements IDAO {
    async salvar(entidade: entidadeModel): Promise<entidadeModel> {
        const produto = entidade as Produto;
        let idProduto = await db.query(
            "INSERT INTO produtos (cod, nome, marca, tipo, altura, comprimento, quantidade, peso, imagem, largura, diametro, fk_categoria, custo, descricao) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id",
            [
                produto.cod,
                produto.nome,
                produto.marca,
                produto.tipo,
                produto.peso,
                produto.altura,
                produto.comprimento,
                produto.quantidade,
                produto.imagem,
                produto.largura,
                produto.diametro,
                produto.categoria,
                produto.custo,
                produto.descricao,

            ],
        );
        entidade.id = idProduto.rows[0].id;
        return entidade as Produto;
    }

    async alterar(entidade: entidadeModel): Promise<entidadeModel> {
        const produto = entidade as Produto;
        console.log("categoria", produto.categoria)
        await db.query(
            "UPDATE produtos SET cod=$1, nome=$2, marca=$3, tipo=$4, altura=$5, comprimento=$6, quantidade=$7, peso=$8, imagem=$9, largura=$10, diametro=$11, fk_categoria=$12, custo=$13, descricao=$14 WHERE id=$15",

            [
                produto.cod,
                produto.nome,
                produto.marca,
                produto.tipo,
                produto.peso,
                produto.altura,
                produto.comprimento,
                produto.quantidade,
                produto.imagem,
                produto.largura,
                produto.diametro,
                produto.categoria,
                produto.custo,
                produto.descricao,
                produto.id

            ]

        );

        return entidade as Produto;

    }
    excluir(entidade: EntidadeDominio): boolean {
        const produto = entidade as Produto;
        db.query("DELETE FROM produtos WHERE id=$1", [produto.id]);
        return true;
    }
    async consultar(): Promise<entidadeModel[]> {
        let produtos = db.query("select * from produtos ORDER BY random()");
        let result: Array<EntidadeDominio> = [];

        result = await produtos.then((dados) => {
            return (result = dados.rows.map((produto) => {
                return produto as Produto;
            }));
        });

        return result;
    }
    async consultarComId(entidade: EntidadeDominio): Promise<Array<EntidadeDominio>> {
        const produto = entidade as Produto;
        let pdt = db.query("SELECT * FROM produtos WHERE id = $1", [produto.id]);
        let result: Array<EntidadeDominio> = [];

        result = await pdt.then((dados) => {
            return (result = dados.rows.map((produto) => {
                return produto;
            }));
        });

        return result;
    }
    

}
