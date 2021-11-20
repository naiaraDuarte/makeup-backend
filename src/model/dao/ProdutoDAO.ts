import Produto from "../entidade/produto";
import IDAO from "./IDAO";
import { db } from '../../db.config';
import EntidadeDominio from "../entidade/entidadeDominio";

export default class ProdutoDAO implements IDAO {
    async salvar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
        const produto = entidade as Produto;
        
        let idProduto = await db.query(
            "INSERT INTO produtos (cod, nome, marca, tipo, altura, comprimento, quantidade, peso, imagem, largura, diametro, fk_categoria, custo, descricao, preco) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING id",
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
                produto.categoria.id,
                produto.custo,
                produto.descricao,
                produto.preco
            ],
        );
        entidade.id = idProduto.rows[0].id;
        return entidade as Produto;
    }
    async alterar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
        const produto = entidade as Produto;  
              
        if (Object.keys(produto).length > 3) {            
            await db.query(
                "UPDATE produtos SET cod=$1, nome=$2, marca=$3, tipo=$4, altura=$5, comprimento=$6, peso=$7, quantidade=$8, imagem=$9, largura=$10, diametro=$11, fk_categoria=$12, custo=$13, descricao=$14, preco=$15 WHERE id=$16",
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
                    produto.categoria.id,
                    produto.custo,
                    produto.descricao,
                    produto.preco,
                    produto.id
                ]
            );
        } else {
         
            await db.query("UPDATE produtos SET quantidade = quantidade + 1 WHERE id IN (SELECT produtos.id FROM produtos_pedidos INNER JOIN produtos ON produtos.id = produtos_pedidos.fk_produto WHERE produtos_pedidos.id = $1)", 
            [produto.id]);
        }
        return entidade as Produto;
    }
    inativar(entidade: EntidadeDominio): boolean {
        const produto = entidade as Produto;
        db.query("UPDATE produtos SET ativo=$1, observacao=$2, fk_inativacao=$3 WHERE id=$4", 
        [
            produto.status,
            produto.observacao,
            produto.catInativacao.id,
            produto.id
        ]);
        return true;
    }

    async consultarAdm(): Promise<EntidadeDominio[]> { 
        let produtos = db.query("SELECT * FROM produtos");  
        let result: Array<EntidadeDominio> = [];

        result = await produtos.then((dados) => {
            return (result = dados.rows.map((produto) => {
                return produto as Produto;
            }));
        });    
        return result;
    }

    async consultar(): Promise<EntidadeDominio[]> { 
       let produtos = db.query("SELECT * FROM produtos WHERE quantidade > 10 AND ativo=true ORDER BY random()");
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
