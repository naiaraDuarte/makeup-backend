import IDAO from './IDAO';
import EntidadeDominio from '../entidade/entidade.model';
import { db } from '../../db.config';
import Cartao from '../entidade/cartao.model';
import Pedido from '../entidade/pedido';

export default class CartaoDAO implements IDAO {
    async salvar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
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
    async alterar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
        const cartao = entidade as Cartao;
        await db.query(
            "UPDATE cartoes SET numero=$1, nome=$2, data_validade=$3, cvv=$4, bandeira=$5 WHERE id=$6",
            [
                cartao.numero,
                cartao.nome,
                cartao.data_validade,
                cartao.cvv,
                cartao.bandeira,
                cartao.id

            ]
        );
        return entidade as Cartao;

    }
    excluir(entidade: EntidadeDominio): boolean {
        const cartao = entidade as Cartao;
        db.query("UPDATE cartoes SET ativo = false WHERE id=$1", [cartao.id]);
        return true;
    };

    consultar(): Promise<EntidadeDominio[]> {
        throw new Error('Method not implemented.');
    }
    async consultarComId(entidade: EntidadeDominio): Promise<Array<EntidadeDominio>> {
        const cartao = entidade as Cartao;
        let cart = db.query("SELECT * FROM cartoes WHERE fk_cliente = $1 AND ativo = true", [cartao.idCliente]);
        let result: Array<EntidadeDominio> = [];

        result = await cart.then((dados) => {
            return (result = dados.rows.map((cliente) => {
                return cliente as Cartao;
            }));
        });

        return result;
    }
    async consultarPedido(entidade: EntidadeDominio, fk: Number): Promise<Array<EntidadeDominio>> {
        const pedido = entidade as Pedido
        console.log("dao", fk)

        let cartoes = db.query("SELECT * FROM cartoes WHERE id IN (SELECT fk_cartoes FROM pagamento_cartoes WHERE fk_pagamentos IN (SELECT fk_pagamento FROM pedidos WHERE id = $1))", [
            fk
        ])
        let result: any;

        result = await cartoes.then((dados) => {
            console.log("MERDA", dados)
            return (result = dados.rows.map((cartao) => {
                console.log("MDS", cartao)
                return cartao as Cartao;
            }));
        });

        console.log("MDS", result)

        return result;



    }
}