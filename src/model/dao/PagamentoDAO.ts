import IDAO from './IDAO';
import EntidadeDominio from '../entidade/entidadeDominio';
import { db } from '../../db.config';
import Pagamento from '../entidade/pagamento';
import PagamentoCartaoDAO from './PagamentoCartaoDAO';
import Cupom from '../entidade/cupom';

export default class PagamentoDAO implements IDAO {
    async consultarPedido(entidade: EntidadeDominio, id: Number): Promise<EntidadeDominio[]> {
        let cupons = db.query("SELECT * from cupons WHERE id IN (SELECT fk_cupom FROM pagamentos WHERE id IN (SELECT fk_pagamento FROM pedidos WHERE id = $1))", [
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
    

