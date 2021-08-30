import IDAO from './IDAO';
import EntidadeDominio from '../entidade/entidade.model';
import { db } from '../../db.config';
import Cartao from '../entidade/cartaoCredito.model';

export default class CartaoDAO implements IDAO {
    consultarComId(entidade: EntidadeDominio): Promise<EntidadeDominio[]> {
        throw new Error('Method not implemented.');
    }
    async salvar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
        console.log("dentro dao cartao");
        const cartao = entidade as Cartao;
        let idCartao = await db.query(
            "INSERT INTO cartoes(numero, nome, data_validade, cvv, fk_cliente, bandeira) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",     
        [
                cartao.numero,
                cartao.nome,
                cartao.data_validade,
                cartao.cvv,
                cartao.idCliente,
                cartao.bandeira
            
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