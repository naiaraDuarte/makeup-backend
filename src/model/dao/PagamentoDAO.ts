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
            const pagamento = entidade as Pagamento;
            
            let idPagamento = await db.query(
                "INSERT INTO pagamentos (fk_cupom, fk_cashback) VALUES ($1, $2) RETURNING id",
                [
                    pagamento.cupom.id,
                    pagamento.cashback.id
                    
    
                ]
    
            );
            entidade.id = idPagamento.rows[0].id;
            return entidade as Pagamento;
        }
    }
    

