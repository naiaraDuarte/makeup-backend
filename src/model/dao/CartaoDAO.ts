import IDAO from './IDAO';
import EntidadeDominio from '../entidade/entidade.model';
import { db } from '../../db.config';
import Cartao from '../entidade/cartaoCredito.model';

export default class CartaoDAO implements IDAO {
    async salvar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
        const cartao = entidade as Cartao;
        let idCartao = await db.query('INSERT INTO cartoes(numero_cartao, nome_cartao, exp_cartao, cod_seg_cartao) VALUES (?, ?, ?, ?); RETURNING id',
            [
                cartao.numero,
                cartao.nomeTitular,
                cartao.dataValidade,
                cartao.cvv
            ]
        );
        entidade.id = idCartao.rows[0].id;
        return entidade as Cartao;
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
    consultar2(entidade: EntidadeDominio): Promise<EntidadeDominio> {
        throw new Error('Method not implemented.');
    }
}