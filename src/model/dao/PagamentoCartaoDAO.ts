import IDAO from './IDAO';
import EntidadeDominio from '../entidade/entidadeDominio';
import { db } from '../../db.config';
import PagamentoCartao from '../entidade/pagamentoCartao';

export default class PagamentoCartaoDAO implements IDAO {
    async consultarPedido(entidade: EntidadeDominio, id: Number): Promise<EntidadeDominio[]> {
        let pagamentoCartao = db.query("SELECT * from pagamento_cartoes WHERE pcar_id = $1",[id]);

        let result : any;
        result = await pagamentoCartao.then((dados) => {
            return (result = dados.rows.map((pagamentoCartao) => {                
              return pagamentoCartao as PagamentoCartao;
            }));
          });
      
          return result;;
    }
    async salvar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
        const pagamentoCartao = entidade as PagamentoCartao;
                    
        let idPagamentoCartao = await db.query(
            "INSERT INTO pagamento_cartoes (pcar_pgt_id, pcar_cart_id) VALUES ($1, $2) RETURNING pcar_id",
            [
                pagamentoCartao.pagamento.id,
                pagamentoCartao.cartao.id                

            ]

        );
        entidade.id = idPagamentoCartao.rows[0].id;
        return entidade as PagamentoCartao;
    }
    
    alterar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
        throw new Error('Method not implemented.');
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