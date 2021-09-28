import IDAO from './IDAO';
import EntidadeDominio from '../entidade/entidade.model';
import { db } from '../../db.config';
import PagamentoCartao from '../entidade/pagamentoCartao';

export default class PagamentoCartaoDAO implements IDAO {
    async consultarPedido(entidade: EntidadeDominio, id: Number): Promise<EntidadeDominio[]> {
        let pagamentoCartao = db.query("SELECT * from pagamento_cartoes WHERE id = $1",[id]);

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
            "INSERT INTO pagamento_cartoes (fk_pagamentos, fk_cartoes) VALUES ($1, $2) RETURNING ID",
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