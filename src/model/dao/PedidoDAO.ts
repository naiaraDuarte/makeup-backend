import { db } from "../../db.config";
import Endereco from "../entidade/endereco";
import entidadeModel from "../entidade/entidade.model";
import Pedido from "../entidade/pedido";
import ClienteDAO from "./ClienteDAO";
import IDAO from "./IDAO";

export default class PedidoDAO implements IDAO {
    async salvar(entidade: entidadeModel): Promise<entidadeModel> {
        console.log("dentro dao pedido");
        const pedido = entidade as Pedido;
        let idPedido = await db.query(
            "INSERT INTO pedidos (fk_cliente, fk_endereco, fk_pagamento) VALUES ($1, $2, $3, $4) RETURNING id",
            [                
                pedido.cliente,
                pedido.endereco,
                pedido.pagamento
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