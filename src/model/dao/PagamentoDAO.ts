import IDAO from './IDAO';
import EntidadeDominio from '../entidade/entidadeDominio';
import { db } from '../../db.config';
import Pagamento from '../entidade/pagamento';
import PagamentoCartaoDAO from './PagamentoCartaoDAO';
import Cupom from '../entidade/cupom';

export default class PagamentoDAO implements IDAO {
    async consultarPedido(entidade: EntidadeDominio, id: Number): Promise<EntidadeDominio[]> {
        let cupons = db.query("SELECT * from cupons WHERE id IN (SELECT pgt_cup_id FROM pagamentos WHERE id IN (SELECT ped_pgt_id FROM pedidos WHERE ped_id = $1))", [
            id
          ])
          let result: any;
      
          result = await cupons.then((dados) => {
              return (result = dados.rows.map((cupom) => {
                  return cupom as Cupom;
              }));
          });
        return result;
    ;
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
    async salvar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
            const pagamento = entidade as Pagamento;
            let idPagamento = await db.query(
                "INSERT INTO pagamentos (pgt_cup_id, pgt_cash_id) VALUES ($1, $2) RETURNING pgt_id",
                [
                    pagamento.cupom.id,
                    pagamento.cashback.id
                ]
    
            );
            entidade.id = idPagamento.rows[0].id;
            return entidade as Pagamento;
        }
        
    }
    

