import entidadeModel from "../entidade/entidadeDominio";
import Produto from "../entidade/produto";
import IDAO from "./IDAO";
import { db } from '../../db.config';
import EntidadeDominio from "../entidade/entidadeDominio";

export default class ProdutoDAO implements IDAO {
    async salvar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
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

    async alterar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
        const produto = entidade as Produto;
        console.log("pdt", produto)
        if (Object.keys(produto).length > 3) {
            console.log("pdt if",Object.keys(produto).length)
            await db.query(
                "UPDATE produtos SET cod=$1, nome=$2, marca=$3, tipo=$4, altura=$5, comprimento=$6, quantidade=$7, peso=$8, imagem=$9, largura=$10, diametro=$11, fk_categoria=$12, custo=$13, descricao=$14, preco=$15 WHERE id=$16",

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
                    produto.preco,
                    produto.id
                ]
            );
        } else {
            console.log("else produto", produto)
            let key = Object.keys(produto);
            let values = Object.values(produto);
            await db.query(
                "UPDATE produtos SET quantidade = (quantidade + $1) WHERE id=$2", [values[1], values[0]]);

        }

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
    async consultarPedido(entidade: EntidadeDominio, id: Number): Promise<EntidadeDominio[]> {

        let produto = db.query("select * from produtos inner join produtos_pedidos on produtos.id = fk_produto where produtos_pedidos.fk_pedido=$1", [
            id
        ])
        let result: any;

        result = await produto.then((dados) => {
            return (result = dados.rows.map((cupom) => {
                return cupom as Produto;
            }));
        });

        return result;
    }

    async alterarEstoque(entidade: EntidadeDominio): Promise<Array<EntidadeDominio>> {
        const produto = entidade as Produto;
        let pdt = db.query("UPDATE produtos SET quantidade=(quantidade-$1) WHERE id=$2", [
            produto.quantidade,
            produto.id

        ]);

        let result: Array<EntidadeDominio> = [];

        result = await pdt.then((dados) => {
            return (result = dados.rows.map((produto) => {
                return produto;
            }));
        });
        return result;
    }


}
