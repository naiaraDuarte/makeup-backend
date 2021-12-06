import Produto from "../entidade/produto";
import IDAO from "./IDAO";
import { db } from '../../db.config';
import EntidadeDominio from "../entidade/entidadeDominio";

export default class ProdutoDAO implements IDAO {
    async salvar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
        const produto = entidade as Produto;
        
        let idProduto = await db.query(
            "INSERT INTO PRODUTOS (pdt_cod, pdt_nome, pdt_marca, pdt_tipo, pdt_altura, pdt_comprimento, pdt_quantidade, pdt_peso, pdt_imagem, pdt_largura, pdt_diametro, pdt_cat_id, pdt_custo, pdt_descricao, pdt_preco) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING pdt_id",
            [
                produto.cod,
                produto.nome,
                produto.marca,
                produto.tipo,
                produto.altura,
                produto.comprimento,               
                produto.quantidade,
                produto.peso,
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
                "UPDATE PRODUTOS SET pdt_cod=$1, pdt_nome=$2, pdt_marca=$3, pdt_tipo=$4, pdt_altura=$5, pdt_comprimento=$6, pdt_peso=$7, pdt_quantidade=$8, pdt_imagem=$9, pdt_largura=$10, pdt_diametro=$11, pdt_cat_id=$12, pdt_custo=$13, pdt_descricao=$14, pdt_preco=$15 WHERE pdt_id=$16",
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
         
            await db.query("UPDATE PRODUTOS SET pdt_quantidade = pdt_quantidade + 1 WHERE id IN (SELECT PRODUTOS.pdt_id FROM PRODUTOS_PEDIDOS INNER JOIN PRODUTOS ON PRODUTOS.pdt_id = PRODUTOS_PEDIDOS.ppd_pdt_id WHERE PRODUTOS_PEDIDOS.ppd_id = $1)", 
            [produto.id]);
        }
        return entidade as Produto;
    }
    inativar(entidade: EntidadeDominio): boolean {
        const produto = entidade as Produto;
        db.query("UPDATE PRODUTOS SET pdt_ativo=$1, pdt_observacao=$2, pdt_ina_id=$3 WHERE pdt_id=$4", 
        [
            produto.status,
            produto.observacao,
            produto.catInativacao.id,
            produto.id
        ]);
        return true;
    }

    async consultarAdm(): Promise<EntidadeDominio[]> { 
        let produtos = db.query("SELECT * FROM PRODUTOS");  
        let result: Array<EntidadeDominio> = [];

        result = await produtos.then((dados) => {
            return (result = dados.rows.map((produto) => {
                return produto as Produto;
            }));
        });    
        return result;
    }

    async consultar(): Promise<EntidadeDominio[]> { 
       let produtos = db.query("SELECT * FROM PRODUTOS WHERE pdt_ativo=true ORDER BY random()");
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
        let pdt = db.query("SELECT * FROM PRODUTOS WHERE pdt_id = $1", [produto.id]);
        let result: Array<EntidadeDominio> = [];

        result = await pdt.then((dados) => {
            return (result = dados.rows.map((produto) => {
                return produto;
            }));
        });
        return result;
    }
    async consultarPedido(entidade: EntidadeDominio, id: Number): Promise<EntidadeDominio[]> {
        let produto = db.query("select * from PRODUTOS inner join produtos_pedidos on produtos.pdt_id = ppd_pdt_id where produtos_pedidos.ppd_ped_id=$1", [
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
        
        let pdt = db.query("UPDATE PRODUTOS SET pdt_quantidade=(pdt_quantidade-$1) WHERE pdt_id=$2", [
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
