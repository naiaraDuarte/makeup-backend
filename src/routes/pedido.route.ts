import express from "express";
import Fachada from "../control/Fachada";
import Pedido from "../model/entidade/pedido";

export const PedidoRouter= express.Router();

let fachada = new Fachada();


PedidoRouter.post("/", async (req, res) => {    
    let ped= req.body    
    const pedido = {        
        idCliente: ped.cliente,
        idEndereco: ped.endereco,
        idPagamento: ped.pagamento   
       
    };

    console.log("pedido", pedido);
  
    let conversao = Object.assign(new Pedido(), pedido);
    let listaPedido: any = await fachada.cadastrar(conversao as Pedido);

  
    res.json({ message: "OK", pedido: listaPedido });
  });