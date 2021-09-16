import express from "express";
import { idText } from "typescript";
import Fachada from "../control/Fachada";
import Cupom from "../model/entidade/cupom";

export const CupomRouter = express.Router();

let fachada = new Fachada();

CupomRouter.get("/", async (req, res) => {
    let listaCupom: Array<Cupom> = (await fachada.consultar(
        new Cupom())) as Array<Cupom>;
    res.json({ message: "OK", dados: listaCupom });
});

CupomRouter.get("/:id", async (req, res) => {
    const cupom = {
      id: req.params.id,
    };
    let conversao = Object.assign(new Cupom(), cupom);
    let listaCupom: any = await fachada.consultarComId(conversao as Cupom);
  
    res.json({ message: "OK", cupom: listaCupom});
  });

CupomRouter.post("/", async (req, res) => {
    let cup = req.body
    const cupom = {
        cod: cup.cod,
        quant: cup.quant,
        porcen: cup.porcen,
        tipo: cup.tipo,
    };

    let conversao = Object.assign(new Cupom(), cupom);
    let listaCupom: any = await fachada.cadastrar(conversao as Cupom);

    res.json({ message: "OK", cupom: listaCupom });
});
CupomRouter.put("/:id", async (req, res) => {
    let cup= req.body;
    const cupom = {
        id : req.params.id,
        cod: cup.cod,
        quant: cup.quant,
        porcen: cup.porcen,
        tipo: cup.tipo         
        
    };

    let conversao = Object.assign(new Cupom(), cupom);
    let listaCupom: any = await fachada.alterar(conversao as Cupom);
    res.json({ message: "OK", dados: listaCupom });
});
CupomRouter.delete("/:id", async (req, res) => {
    const cupom = {
      id: req.params.id,
    };
    let conversao = Object.assign(new Cupom(), cupom);
    let cup: boolean = await fachada.excluir(conversao as Cupom);

  res.json({ message: "OK", dados: cup});
});

