import express from "express";
import Fachada from "../control/Fachada";
import Cartao from "../model/entidade/cartao.model";
import Cashback from "../model/entidade/cashback";
import pagamento from "../model/entidade/pagamento";
import Pedido from "../model/entidade/pedido";

export const PedidoRouter= express.Router();

let fachada = new Fachada();


PedidoRouter.post("/", async (req, res) => {    
    let produto = req.body.produto;
    let arrayProduto: any = [];
    produto.forEach(async (pdt: any) => {
    arrayProduto.push({
        id:pdt.id,
        quantidade: pdt.quantidade      
    });    
    
    // let cup = req.body.cupom;
    // const cupom = {
    //     id: cup.id        
    // }

    // let cart = req.body.cartao
    // const cartao = {
    //    id: cart.id,
    // }
    // let cash = req.body.cashback
    // const cashback = {
    //   id: cash.id
    // }
    let cup = req.body.cupom;
    let cart = req.body.cartao
    let cash = req.body.cashback
    let pagamento = {
      cartao: cart.id,
      cupom : cup.id,
      cashback: cash.id

    }
    console.log("pagmt", pagamento);
    // let arrayCartao: any = [];
    // cartao.forEach((cart: any) => {
    // arrayCartao.push({
    //     id:cart.id,
    //     valor: cart.valor
      
    // });
  });  

    
    let ped= req.body    
    const pedido = {        
        cliente: ped.cliente.id,
        endereco: ped.endereco.id,
        pagamento: pagamento
       
    };
    console.log("pagamento", pagamento)
      
    let conversao = Object.assign(new Pedido(), pedido);
    let listaPedido: any = await fachada.cadastrar(conversao as Pedido);

  
    res.json({ message: "OK", pedido: listaPedido });
  });

