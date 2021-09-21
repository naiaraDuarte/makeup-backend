import { db } from "../../db.config";
import entidadeModel from "../entidade/entidade.model";
import pagamento from "../entidade/pagamento";
import Pagamento from "../entidade/pagamento";
import PagamentoCartao from "../entidade/pagamentoCartao";
import Pedido from "../entidade/pedido";
import IDAO from "./IDAO";
import PagamentoCartaoDAO from "./PagamentoCartaoDAO";
import PagamentoDAO from "./PagamentoDAO";

export default class PedidoDAO implements IDAO {
    async salvar(entidade: entidadeModel): Promise<entidadeModel> {
        console.log("dentro dao pedido");
        const pedido = entidade as Pedido;
        
        let pagamentoDao = new PagamentoDAO();
        new Pagamento();
        console.log("pagamentoooii", pedido.pagamento)
        let pagamento = await pagamentoDao.salvar(pedido.pagamento); 
        console.log("pvar18", pedido);

        let pgmtoCartao = new PagamentoCartaoDAO();
        
        pedido.pagamento.cartoes.forEach(cart => {
            let pgmentoCartao = {
                cartao: cart,
                pagamento: pagamento
            }
            pgmtoCartao.salvar(pgmentoCartao as PagamentoCartao);                        
        });
        
        
               
        let idPedido = await db.query(
            "INSERT INTO pedidos (fk_prod_ped, fk_cliente, fk_endereco, fk_pagamento) VALUES ($1, $2, $3, $4) RETURNING id",
            [    
                1,           
                pedido.cliente,
                pedido.endereco,
                pedido.pagamento.id
            ]

        );     


            entidade.id = idPedido.rows[0].id;
            return entidade as Pedido
        }
    
    
        alterar(entidade: entidadeModel): Promise < entidadeModel > {
            throw new Error("Method not implemented.");
        }
        excluir(entidade: entidadeModel): boolean {
            throw new Error("Method not implemented.");
        }
        consultar(): Promise < entidadeModel[] > {
            throw new Error("Method not implemented.");
        }
        consultarComId(entidade: entidadeModel): Promise < entidadeModel[] > {
            throw new Error("Method not implemented.");
        }

    }