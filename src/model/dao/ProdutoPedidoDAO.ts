import IDAO from './IDAO';
import EntidadeDominio from '../entidade/entidadeDominio';
import { db } from '../../db.config';
import ProdutoPedido from '../entidade/produtoPedido';
import Produto from '../entidade/produto';

export default class ProdutoPedidoDAO implements IDAO{
    async consultarPedido(entidade: EntidadeDominio, id: Number): Promise<EntidadeDominio[]> {
       
        let produtos = db.query("select * from produtos inner join produtos_pedidos on produtos.id = fk_produto where produtos_pedidos.fk_pedido=$1",[id]);
        let result: any;
        
        result = await produtos.then((dados) => {
          return (result = dados.rows.map(async (produtos) => {               
            return produtos as Produto;
          }));
        });
        return result;
    }
    async salvar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
        const produtoPedido = entidade as ProdutoPedido;
        let qntde = produtoPedido.qtdeComprada;

        for(let i=1; i<=qntde; i++){                
        let idProdutoPedido = await db.query(
            "INSERT INTO produtos_pedidos(fk_produto, fk_pedido, status, qtde_comprada, preco) VALUES ($1, $2, $3, $4, $5) RETURNING ID",
            [
                produtoPedido.produto.id,
                produtoPedido.pedido.id,
                produtoPedido.status, 
                1,
                produtoPedido.produto.preco
            ]
        );
        entidade.id = idProdutoPedido.rows[0].id;        
        }
        return entidade as ProdutoPedido;
    }
    async alterar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
        const produtoPedido = entidade as ProdutoPedido;
        const obs = produtoPedido.observacao
        const opcoes = ['EM TRANSPORTE','EM PROCESSAMENTO','CANCELAMENTO SOLICITADO','CANCELAMENTO EFETUADO', 'CANCELAMENTO REJEITADO','ENTREGA REALIZADA','PAGAMENTO REALIZADO']
              
        if (opcoes.includes(obs)){
            produtoPedido.observacao=""
            await db.query(
                "UPDATE produtos_pedidos SET status=$1, observacao=$2 WHERE fk_pedido=$3",
                [
                    produtoPedido.produto.status, 
                    produtoPedido.observacao,
                    produtoPedido.pedido.id,              
                   
                ]                 
            );       
        }else{
            await db.query(
                "UPDATE produtos_pedidos SET status=$1, observacao=$2 WHERE id=$3",
                [
                    produtoPedido.produto.status, 
                    produtoPedido.observacao,
                    produtoPedido.produto.id,         
                   
                ]
                 
            );

        }
            
       
        return entidade as ProdutoPedido;
    }
    inativar(entidade: EntidadeDominio): boolean {
        throw new Error('Method not implemented.');
    }
    consultar(): Promise<EntidadeDominio[]> {
        throw new Error('Method not implemented.');
    }
    consultarComId(entidade: EntidadeDominio): Promise<EntidadeDominio[]> {
        throw new Error('Method not implemented.');
    }
    
}