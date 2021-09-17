import IDAO from './IDAO';
import EntidadeDominio from '../entidade/entidade.model';
import { db } from '../../db.config';
import Pagamento from '../entidade/pagamento';

export default class PagamentoDAO implements IDAO {
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
    async salvar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
        console.log("dao pagamento");
            const pagamento = entidade as Pagamento;
            let idPagamento = await db.query(
                "INSERT INTO pagamentos (fk_cliente, fk_cupom, fk_cartao, fk_cashback) VALUES ($1, $2, $3, $4) RETURNING id",
                [
                    pagamento.cliente,
                    pagamento.cupom,
                    pagamento.cartao,
                    pagamento.cashback  
    
                ]
    
            );
            entidade.id = idPagamento.rows[0].id;
            return entidade as Pagamento;
        }
    }
    

