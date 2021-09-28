import IDAO from './IDAO';
import EntidadeDominio from '../entidade/entidade.model';
import { db } from '../../db.config';
import ProdutoPedido from '../entidade/produtoPedido';
import Produto from '../entidade/produto';

export default class ProdutoPedidoDAO implements IDAO{
    async salvar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
        const produtoPedido = entidade as ProdutoPedido;
              
        let idProdutoPedido = await db.query(
            "INSERT INTO produtos_pedidos(fk_produto, fk_pedido) VALUES ($1, $2) RETURNING ID",
            [
                produtoPedido.produto.id,
                produtoPedido.pedido.id               

            ]

        );
        entidade.id = idProdutoPedido.rows[0].id;
        return entidade as ProdutoPedido;
    }
    alterar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
        throw new Error('Method not implemented.');
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
    async consultarPedido(id: Number){  
        let produtos = db.query("SELECT * from produtos_pedidos WHERE fk_pedido = $1",[id]);
        let result: any;
        
        result = await produtos.then((dados) => {
          return (result = dados.rows.map(async (produtos) => {               
            return produtos as Produto;
          }));
        });
    
        return result;
    
      }

}