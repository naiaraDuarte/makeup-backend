import Fachada from "../../control/Fachada";
import { db } from "../../db.config";
import Cartao from "../entidade/cartao.model";
import Cliente from "../entidade/cliente.model";
import Cupom from "../entidade/cupom";
import Endereco from "../entidade/endereco";
import EntidadeDominio from "../entidade/entidadeDominio";
import Pagamento from "../entidade/pagamento";
import PagamentoCartao from "../entidade/pagamentoCartao";
import Pedido from "../entidade/pedido";
import Produto from "../entidade/produto";
import ProdutoPedido from "../entidade/produtoPedido";
import IDAO from "./IDAO";
import PagamentoCartaoDAO from "./PagamentoCartaoDAO";
import PagamentoDAO from "./PagamentoDAO";
import ProdutoPedidoDAO from "./ProdutoPedidoDAO";

export default class PedidoDAO implements IDAO {
    consultarPedido(entidade: EntidadeDominio, id: Number): Promise<EntidadeDominio[]> {
        throw new Error("Method not implemented.");
    }
    async salvar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
        const pedido = entidade as Pedido;

        // outras formas de pagamento
        let pagamentoDao = new PagamentoDAO();
        new Pagamento();
        let pagamento = await pagamentoDao.salvar(pedido.pagamento);
        let pgmtoCartaoDao = new PagamentoCartaoDAO();
        //salvando cada cartao que consta no pedido

        pedido.pagamento.cartoes.forEach(cart => {
            let pgmentoCartao = {
                cartao: cart,
                pagamento: pagamento
            }
            pgmtoCartaoDao.salvar(pgmentoCartao as PagamentoCartao);
        });
        let data = new Date()
        let idPedido = await db.query(
            "INSERT INTO pedidos (fk_cliente, fk_endereco, fk_pagamento, valor, frete, status, data_cadastro) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
            [
                pedido.cliente,
                pedido.endereco,
                pedido.pagamento.id,
                pedido.valor,
                pedido.frete,
                pedido.status,
                data

            ]

        );

        entidade.id = idPedido.rows[0].id;

        let produtoPedidoDao = new ProdutoPedidoDAO();
        new Produto();
        pedido.produtos.forEach(pdt => {
            let produtoPedido = {
                produto: pdt,
                pedido: pedido,
                status: pedido.status,
                qtdeComprada: pdt.quantidade
            }
            produtoPedidoDao.salvar(produtoPedido as ProdutoPedido);
        });
        // let cashback = {
        //     id: pedido.pagamento.cashback.id,
        //     valor: pedido.pagamento.cashback.valor
        // }

        // let cashbackDao = new CashbackDAO();
        // let alterarQtde = cashbackDao.alterarQtde(cashback as Cashback);

        entidade.id = idPedido.rows[0].id;

        return entidade as Pedido
    }


    async alterar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
        const pedido = entidade as Pedido;
        await db.query(
            "UPDATE pedidos SET status=$1 WHERE id=$2",
            [
                pedido.status,
                pedido.id
            ]
        );
        // if (pedido.status == "TROCA SOLICITADA"){
        //     let produtoPedidoDao = new ProdutoPedidoDAO();
        //     let obs = await produtoPedidoDao.alterar(pedido as Pedido)
        // }

        return entidade as Pedido;
    }
    inativar(entidade: EntidadeDominio): boolean {
        throw new Error("Method not implemented.");
    }
    async consultar(): Promise<EntidadeDominio[]> {
        let pedidos = db.query("SELECT* from pedidos ORDER BY id");

        let result: any;
        let fachada = new Fachada();

        result = await pedidos.then((dados) => {
            return (result = dados.rows.map(async (pedido) => {
                let cliente = Object.assign(new Cliente());
                let endereco = Object.assign(new Endereco(), pedido.endereco);
                let pagamento = Object.assign(new Pagamento(), pedido.pagamento);
                let cupom = Object.assign(new Cupom());
                let cartao = Object.assign(new Cartao(), pedido.cartoes);
                let produto = Object.assign(new Produto(), pedido.produtos);
                pedido.cliente = await fachada.consultarPedido(cliente, pedido.fk_cliente);
                pedido.endereco = await fachada.consultarPedido(endereco, pedido.fk_endereco);
                pedido.cupom = await fachada.consultarPedido(cupom, pedido.id);
                pedido.cartoes = await fachada.consultarPedido(cartao, pedido.id);
                pedido.produtos = await fachada.consultarPedido(produto, pedido.id)
                return pedido as Pedido;
            }));
        });
        return result;
    }

    async consultarComId(entidade: EntidadeDominio): Promise<EntidadeDominio[]> {
        const cliente = entidade as Cliente;
        let pedidos = db.query("SELECT * FROM pedidos WHERE fk_cliente = $1 ORDER BY id", [
            cliente.id,
        ]);
        let result: any;
        let fachada = new Fachada();

        result = await pedidos.then((dados) => {
            return (result = dados.rows.map(async (pedido) => {
                let endereco = Object.assign(new Endereco(), pedido.endereco);
                let pagamento = Object.assign(new Pagamento(), pedido.pagamento);
                let cupom = Object.assign(new Cupom());
                let cartao = Object.assign(new Cartao(), pedido.cartoes);
                let produto = Object.assign(new Produto(), pedido.produtos);
                pedido.endereco = await fachada.consultarPedido(endereco, pedido.fk_endereco);
                pedido.cupom = await fachada.consultarPedido(cupom, pedido.id);
                pedido.cartoes = await fachada.consultarPedido(cartao, pedido.id);
                pedido.produtos = await fachada.consultarPedido(produto, pedido.id)
                return pedido as Pedido;
            }));
        });

        return result
    }
}
