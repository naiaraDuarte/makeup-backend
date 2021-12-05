import IDAO from './IDAO';
import EntidadeDominio from '../entidade/entidadeDominio';
import { db } from '../../db.config';
import Cartao from '../entidade/cartao.model';
import Pedido from '../entidade/pedido';

export default class CartaoDAO implements IDAO {
    async salvar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
        const cartao = entidade as Cartao;
        let idCartao = await db.query(
            "INSERT INTO CARTOES (cart_numero, cart_nome, cart_data_validade, cart_cvv, cart_cli_id, cart_bandeira) VALUES ($1, $2, $3, $4, $5, $6) RETURNING cart_id",
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
            "UPDATE CARTOES SET cart_numero=$1, cart_nome=$2, cart_data_validade=$3, cart_cvv=$4, cart_bandeira=$5 WHERE cart_id=$6",
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
    inativar(entidade: EntidadeDominio): boolean {
        const cartao = entidade as Cartao;
        db.query("UPDATE CARTOES SET cart_ativo = false WHERE cart_id=$1", [cartao.id]);
        return true;
    };

    consultar(): Promise<EntidadeDominio[]> {
        throw new Error('Method not implemented.');
    }
    async consultarComId(entidade: EntidadeDominio): Promise<Array<EntidadeDominio>> {
        const cartao = entidade as Cartao;
       
        let cart = db.query("SELECT * FROM CARTOES WHERE cart_cli_id = $1 AND cart_ativo = true", [cartao.idCliente]);
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

        let cartoes = db.query("SELECT * FROM CARTOES WHERE cart_id IN (SELECT pcar_cart_id FROM PAGAMENTO_CARTOES WHERE pcar_pgt_id IN (SELECT pcar_pgt_id FROM PEDIDOS WHERE ped_id = $1))", [
            fk
        ])
        let result: any;

        result = await cartoes.then((dados) => {
            return (result = dados.rows.map((cartao) => {
                return cartao as Cartao;
            }));
        });

        return result;



    }
}