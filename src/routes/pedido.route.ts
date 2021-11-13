import express from "express";
import Fachada from "../control/Fachada";
import Pedido from "../model/entidade/pedido";
import produto from "../model/entidade/produto";
import Produto from "../model/entidade/produto";
import ProdutoPedido from "../model/entidade/produtoPedido";

export const PedidoRouter = express.Router();

// const multer = require('multer');

// const upload = multer({
//   dest: './files/',
//   limits: { fieldSize: 50 * 1024 * 1024 },
// });

let fachada = new Fachada();

PedidoRouter.get("/", async (req, res) => {
  let listaPedido: any = (await fachada.consultar(
    new Pedido()
  ));

  console.log("BBBBBBBBBB")

  let todosOsPedidos: any = [];
  for (let i = 0; i < listaPedido.length; i++) {
    listaPedido[i].then((ped: any) => {
      todosOsPedidos.push({
        cliente: listaPedido.cliente,
        pedido: ped,
        endereco: listaPedido.endereco,
        pagamento: listaPedido.pagamento,
        cartao: listaPedido.cartoes,
      });
      if (i == listaPedido.length - 1) {
        res.json({ message: "OK", todosOsPedidos });
      }
    });
  }
});

PedidoRouter.get("/:id", async (req, res) => {
  const pedido = {
    id: req.params.id,
  };
  let conversao = Object.assign(new Pedido(), pedido);
  let listaPedido: any = await fachada.consultarComId(conversao as Pedido);

  let todosOsPedidos: any = [];

  for (let i = 0; i < listaPedido.length; i++) {
    listaPedido[i].then((ped: any) => {
      todosOsPedidos.push({
        pedido: ped,
        endereco: listaPedido.endereco,
        pagamento: listaPedido.pagamento,
        cartao: listaPedido.cartoes,
      });
      if (i == listaPedido.length - 1) {
        res.json({ message: "OK", todosOsPedidos });
      }

    });
  }
});

PedidoRouter.post("/", async (req, res) => {
  let produto = req.body.produto;
  let arrayProduto: any = [];
  produto.forEach(async (pdt: any) => {
    arrayProduto.push({
      id: pdt.id,
      quantidade: pdt.quantidade,
    });
  });

  let cartao = req.body.cartao;
  let arrayCartoes: any = [];
  cartao.forEach(async (cart: any) => {
    arrayCartoes.push({
      id: cart.id,
      credito: cart.credito,
    });
  });

  let cup = req.body.cupom;
  let cash = req.body.cashback;

  const pagamento = {
    cartoes: arrayCartoes,
    cupom: cup,
    cashback: cash,
  };

  let ped = req.body;
  const pedido = {
    cliente: ped.cliente.id,
    endereco: ped.endereco.id,
    pagamento: pagamento,
    produtos: arrayProduto,
    status: ped.status,
    valor: ped.valor,
    frete: ped.frete,
    dataCadastro: ped.dataCadastro
  };
  let conversao = Object.assign(new Pedido(), pedido);
  let listaPedido: any = await fachada.cadastrar(conversao as Pedido);

  if (listaPedido.msgn.length > 1) {
    res.status(400).json({ status: 1, mensagem: listaPedido.msgn });
  }
  else {
    res.status(200).json({ status: 0, dados: listaPedido });
  }
});

PedidoRouter.put("/status/:id", async (req, res) => {
  // console.log("PELO AMOR DE DEUS", JSON.parse(req.body.data))
  // if (req.body.data.troca.length > 0) {
  //   //Troca
  //   let arrayProduto: any = [];
  //   arrayProduto.push({
  //     id: req.body.fk_produto,
  //     quantidade: 1,
  //     cod: req.params.id
  //   });
  //   console.log("sss", arrayProduto)
  // } else {
  //   //cancelamento
  //   arrayProduto.push({
  //     id: req.body.,
  //     quantidade: 1,
  //     cod: req.params.id
  //   });
  // }
  let arrayProduto: any = [];
  arrayProduto.push({
      id: req.body.fk_produto,
      quantidade: 1,
      cod: req.params.id     
    });
    console.log("sss", arrayProduto)

  let pedido = {
    id: req.params.id, 
    status: req.body.status,
    produtos: arrayProduto
  }  

  let produto={
    id: req.body.id_produto,   
    status: req.body.status,
  }
  console.log("jdjdjd")
  let convert = Object.assign(new Pedido(), pedido);
  let lista: any = await fachada.alterar(convert as Pedido);

  const pedidoProduto = {
    pedido: Object.assign(new Pedido(), pedido),
    produto: Object.assign(new Produto(), produto),
    observacao: req.body.status, 
  };

  let conversao = Object.assign(new ProdutoPedido(), pedidoProduto);
  let listaPedido: any = await fachada.alterar(conversao as ProdutoPedido);
  if (!listaPedido.msgn) {
    res.status(200).json({ status: 0, message: listaPedido });
  }
  else {
    res.status(400).json({ status: 1, dados: listaPedido.msgn });
  }
});

PedidoRouter.put("/troca/:id", async (req, res) => {
  let pedido = {
    id: req.params.id,
    status: req.body.status
  }
  let produto = {
    id: req.body.produto.id,
    status: req.body.status,
  }

  let convert = Object.assign(new Pedido(), pedido);
  let lista: any = await fachada.alterar(convert as Pedido);

  const pedidoProduto = {
    pedido: Object.assign(new Pedido(), pedido),
    produto: Object.assign(new Produto(), produto),
    observacao: req.body.produto.observacao
  };

  let conversao = Object.assign(new ProdutoPedido(), pedidoProduto);
  let listaPedido: any = await fachada.alterar(conversao as ProdutoPedido);
  if (!listaPedido.msgn) {
    res.status(200).json({ status: 0, message: listaPedido });
  }
  else {
    res.status(400).json({ status: 1, dados: listaPedido.msgn });
  }
});