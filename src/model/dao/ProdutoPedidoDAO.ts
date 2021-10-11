import IDAO from './IDAO';
import EntidadeDominio from '../entidade/entidade.model';
import { db } from '../../db.config';
import ProdutoPedido from '../entidade/produtoPedido';
import Produto from '../entidade/produto';

export default class ProdutoPedidoDAO implements IDAO{
    async consultarPedido(entidade: EntidadeDominio, id: Number): Promise<EntidadeDominio[]> {
        let produtos = db.query("SELECT * from produtos_pedidos WHERE fk_pedido = $1",[id]);
        let result: any;
        
        result = await produtos.then((dados) => {
          return (result = dados.rows.map(async (produtos) => {               
            return produtos as Produto;
          }));
        });
    
        return result;;
    }
    async salvar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
        const produtoPedido = entidade as ProdutoPedido;
              
        let idProdutoPedido = await db.query(
            "INSERT INTO produtos_pedidos(fk_produto, fk_pedido, status) VALUES ($1, $2, $3) RETURNING ID",
            [
                produtoPedido.produto.id,
                produtoPedido.pedido.id,
                produtoPedido.status, 
            ]

        );
        entidade.id = idProdutoPedido.rows[0].id;
        return entidade as ProdutoPedido;
    }
    async alterar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
        const produtoPedido = entidade as ProdutoPedido;
        await db.query(
            "UPDATE produtos_pedidos SET status=$1 WHERE fk_produto=$2 AND fk_pedido=$3",
            [
                produtoPedido.status, 
                produtoPedido.produto.id,
                produtoPedido.pedido.id,
            ]
        );

        return entidade as ProdutoPedido;
    }
    excluir(entidade: EntidadeDominio): boolean {
        throw new Error('Method not implemented.');
    }
    consultar(): Promise<EntidadeDominio[]> {
        throw new Error('Method not implemented.');
    }
    consultarComId(entidade: EntidadeDominio): Promise<EntidadeDominio[]> {
        throw new Error('Method not implemented.');
    }
    
}