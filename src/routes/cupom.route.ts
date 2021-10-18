import express from "express";
import { idText } from "typescript";
import Fachada from "../control/Fachada";
import Cupom from "../model/entidade/cupom";

export const CupomRouter = express.Router();

let fachada = new Fachada();

CupomRouter.get("/", async (req, res) => {
  let listaCupom: Array<Cupom> = (await fachada.consultar(
    new Cupom()
  )) as Array<Cupom>;
  res.json({ message: "OK", dados: listaCupom });
});

CupomRouter.get("/:cod", async (req, res) => {
  const cupom = {
    cod: req.params.cod,
  };
  let conversao = Object.assign(new Cupom(), cupom);
  let listaCupom: any = await fachada.consultarComId(conversao as Cupom);
console.log("lista", listaCupom.length)
  if (listaCupom.length<1){
    console.log("400")
    res.status(400).json({status: 1});   
  }
  else{
      res.status(200).json({status: 0, cupom: listaCupom});
    }
});

CupomRouter.post("/", async (req, res) => {
  let cup = req.body;
  const cupom = {
    cod: cup.cod,
    quant: cup.quant,
    porcen: cup.porcen,
    tipo: cup.tipo,
  };

  let conversao = Object.assign(new Cupom(), cupom);
  let listaCupom: any = await fachada.cadastrar(conversao as Cupom);
  if (listaCupom.msgn.length>1){
    res.status(400).json({status: 1, mensagem: listaCupom.msgn});    
  }
    else{
      res.status(200).json({status: 0, dados: listaCupom});
    }
});
CupomRouter.put("/:id", async (req, res) => {
  let cup = req.body;
  const cupom = {
    id: req.params.id,
    cod: cup.cod,
    quant: cup.quant,
    porcen: cup.porcen,
    tipo: cup.tipo,
  };

  let conversao = Object.assign(new Cupom(), cupom);
  let listaCupom: any = await fachada.alterar(conversao as Cupom);
  console.log(listaCupom.msgn.length)
  if (listaCupom.msgn.length > 1){
    res.status(400).json({status: 0, message: listaCupom.msgn});     
  }
    else{
      res.status(200).json({status: 1, dados: listaCupom});
    }
});

CupomRouter.patch("/:id", async(req, res) => {
  let cup = req.body;
  const cupom = {
    id: req.params.id,
    quant: cup.quant,
  };

  console.log(cupom)

  let conversao = Object.assign(new Cupom(), cupom);
  let listaCliente: any = await fachada.alterar(conversao as Cupom);

  res.json({ message: "OK", dados: listaCliente });
  
})

CupomRouter.delete("/:id", async (req, res) => {
  const cupom = {
    id: req.params.id,
  };
  let conversao = Object.assign(new Cupom(), cupom);
  let cup: boolean = await fachada.excluir(conversao as Cupom);

  res.json({ message: "OK", dados: cup });
});
