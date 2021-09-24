import { db } from "../../db.config";
import entidadeModel from "../entidade/entidade.model";
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
    async salvar(entidade: entidadeModel): Promise<entidadeModel> {
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

        let idPedido = await db.query(
            "INSERT INTO pedidos (fk_cliente, fk_endereco, fk_pagamento) VALUES ($1, $2, $3) RETURNING id",
            [
                pedido.cliente,
                pedido.endereco,
                pedido.pagamento.id
            ]

        );

        entidade.id = idPedido.rows[0].id;

        let produtoPedidoDao = new ProdutoPedidoDAO();
        new Produto();
        pedido.produtos.forEach(pdt => {
            let produtoPedido = {
                produto: pdt,
                pedido: pedido
            }
            produtoPedidoDao.salvar(produtoPedido as ProdutoPedido);
        });

        // for (let i = 0; i < pedido.produtos.length; i++) {
        //     let produtoPedido = {
        //             produto: pedido.produtos[i],
        //             pedido: pedido
        //         }   
        //         produtoPedidoDao.salvar(produtoPedido as ProdutoPedido);
        //     };

        entidade.id = idPedido.rows[0].id;
        return entidade as Pedido
    }


    alterar(entidade: entidadeModel): Promise<entidadeModel> {
        throw new Error("Method not implemented.");
    }
    excluir(entidade: entidadeModel): boolean {
        throw new Error("Method not implemented.");
    }
    consultar(): Promise<entidadeModel[]> {
        throw new Error("Method not implemented.");
    }
    consultarComId(entidade: entidadeModel): Promise<entidadeModel[]> {
        throw new Error("Method not implemented.");
    }

}