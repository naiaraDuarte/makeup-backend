import express from "express";
import Fachada from "../control/Fachada";
import { BandeiraCartao } from "../model/entidade/bandeiraCartao";
import Cartao from "../model/entidade/cartao.model";

export const CartaoRouter = express.Router();

let fachada = new Fachada();

CartaoRouter.get("/:id", async (req, res) => {
  const cartao = {
    id: req.params.id,
  };

  let conversao = Object.assign(new Cartao(), cartao);
  let listaCartao: any = await fachada.consultarComId(conversao as Cartao);
  let todosCartoes: any = [];
  // for (let i = 0; i < listaCartao.length; i++) {
  //   listaCartao[i].then((ped: any) => {
  //     todosCartoes.push({
  //       pedido: ped,

  //     });

  //     if (i == listaCartao.length - 1) {
        res.json({ message: "OK", dados: listaCartao });
      // }

    });
//   }
// });



CartaoRouter.post("/:id", async (req, res) => {
  let cartao = req.body;
  const cartaoCredito = {
    idCliente: parseInt(req.params.id),
    nome: cartao.nome,
    numero: cartao.numero,
    cvv: cartao.cvv,
    data_validade: cartao.data_validade.trim(),
    bandeira: BandeiraCartao[cartao.bandeira]
  };
  let conversao = Object.assign(new Cartao(), cartaoCredito);
  let listaCartao: any = await fachada.cadastrar(conversao as Cartao);
  console.log("rota cartao", listaCartao.msgn)

  if (listaCartao.msgn.length > 0) {
    res.status(400).json({ status: 1, mensagem: listaCartao.msgn });
  }
  else {
    res.status(200).json({ status: 0, dados: listaCartao });
  }
});

CartaoRouter.put("/:id", async (req, res) => {
  let cartao = req.body;
  const cartaoCredito = {
    id: parseInt(req.params.id),
    nome: cartao.nome,
    numero: cartao.numero,
    cvv: cartao.cvv,
    data_validade: cartao.data_validade,
    bandeira: BandeiraCartao[cartao.bandeira],

  };

  let conversao = Object.assign(new Cartao(), cartaoCredito);
  let listaCartao: any = await fachada.alterar(conversao as Cartao);
  if (listaCartao.msgn.length > 1) {
    res.status(400).json({ status: 1, mensagem: listaCartao.msgn });
  }
  else {
    res.status(200).json({ status: 0, dados: listaCartao });
  }
});

CartaoRouter.delete("/:id", async (req, res) => {
  const cartaoCredito = {
    id: req.params.id,
  };
  let conversao = Object.assign(new Cartao(), cartaoCredito);;
  let listaCliente: boolean = await fachada.excluir(conversao as Cartao);

  res.json({ message: "OK", dados: listaCliente });
});
