import express from "express";
import Fachada from "../control/Fachada";
import Pedido from "../model/entidade/pedido";


export const PedidoRouter = express.Router();

let fachada = new Fachada();


PedidoRouter.get("/", async (req, res) => {
  let listaPedido: Array<Pedido> = (await fachada.consultar(
    new Pedido()
  )) as Array<Pedido>;
  res.json({ message: "OK", dados: listaPedido });
});

PedidoRouter.get("/:id", async (req, res) => {
  const pedido = {
    id: req.params.id,
  };
  let conversao = Object.assign(new Pedido(), pedido);
  let listaPedido: any = await fachada.consultarComId(conversao as Pedido);

  res.json({ message: "OK", pedido: listaPedido });
});

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

  console.log("rota", pagamento.cupom)
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
