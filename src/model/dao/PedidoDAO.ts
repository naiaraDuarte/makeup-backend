import { db } from "../../db.config";
import Cliente from "../entidade/cliente.model";
import Endereco from "../entidade/endereco";
import entidadeModel from "../entidade/entidade.model";
import Pagamento from "../entidade/pagamento";
import PagamentoCartao from "../entidade/pagamentoCartao";
import Pedido from "../entidade/pedido";
import Produto from "../entidade/produto";
import ProdutoPedido from "../entidade/produtoPedido";
import CartaoDAO from "./CartaoDAO";
import EnderecoDAO from "./EnderecoDAO";
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
        console.log("dao pedido", pedido.status)

        let idPedido = await db.query(
            "INSERT INTO pedidos (fk_cliente, fk_endereco, fk_pagamento, valor, frete, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
            [
                pedido.cliente,
                pedido.endereco,
                pedido.pagamento.id,
                pedido.valor,
                pedido.frete,
                pedido.status
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
    async consultarComId(entidade: entidadeModel): Promise<entidadeModel[]> {
        const cliente = entidade as Cliente;
        let pedidos = db.query("SELECT * FROM pedidos WHERE fk_cliente = $1", [
            cliente.id,
        ]);
        let result: any;
        let enderecoDAO = new EnderecoDAO();
        let pagamentoDao = new PagamentoDAO();
        let pagamentoCartoesDao = new PagamentoCartaoDAO();
        let produtosPedidosDao = new ProdutoPedidoDAO();
        
        result = await pedidos.then((dados) => {
            return (result = dados.rows.map(async (pedido) => {
                pedido.endereco = await enderecoDAO.consultarPedido(pedido.fk_endereco);
                pedido.pagamento = await pagamentoDao.consultarPedido(pedido.fk_pagamento);
                pedido.cartoes = await pagamentoCartoesDao.consultarPedido(pedido.fk_pagamento);
                pedido.produtos = await produtosPedidosDao.consultarPedido(pedido.id)
                console.log("pedido", pedido)
                return pedido as Pedido;
            }));
        });
        
        
        // let enderecoDAO = new EnderecoDAO();   
        // for(let i = 0; i <= (await pedidos).rows.length; i++){
        //     result.endereco = await enderecoDAO.consultarPedido((await pedidos).rows[i])
        // }            
        

        // let cartaoDao = new CartaoDAO();
        // pedidos.forEach(async (ped: entidadeModel) => {
        //      let arrayCartao = await cartaoDao.consultarPedido(ped)
            
        // });   

        
        
             console.log("result", result)  
        return result
  
}


        // result = await endereco.then((dados) => {
        //     return (result = dados.rows.map((endereco) => {        
        //       return endereco as Endereco;
        //     }));
        //   });

        
} 
