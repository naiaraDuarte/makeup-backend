import express from "express";
import Fachada from "../control/Fachada";
import Cartao from "../model/entidade/cartao.model";
import Cashback from "../model/entidade/cashback";
import pagamento from "../model/entidade/pagamento";
import Pedido from "../model/entidade/pedido";
import ValidarValorCartao from "../model/strategy/validarValorCartao";

export const PedidoRouter = express.Router();

let fachada = new Fachada();


PedidoRouter.post("/", async (req, res) => {
  let produto = req.body.produto;
  let arrayProduto: any = [];
  produto.forEach(async (pdt: any) => {
    arrayProduto.push({
      id: pdt.id,
      quantidade: pdt.quantidade
    });
  });

  let cartao = req.body.cartao;
  let arrayCartoes: any = [];
  cartao.forEach(async (cart: any) => {
    arrayCartoes.push({
      id: cart.id,
      credito: cart.credito
    });
  });

  let cup = req.body.cupom;
  let cash = req.body.cashback

 const pagamento = {
    cartoes: arrayCartoes,
    cupom: cup,
    cashback: cash

  }

  let ped = req.body
  const pedido = {
    cliente: ped.cliente.id,
    endereco: ped.endereco.id,
    pagamento: pagamento,
    produtos: arrayProduto,
    status: ped.status,
    valor: ped.valor,
    frete: ped.frete
  };
 
  let conversao = Object.assign(new Pedido(), pedido);
  let listaPedido: any = await fachada.cadastrar(conversao as Pedido);


  res.json({ message: "OK", pedido: listaPedido });
});
