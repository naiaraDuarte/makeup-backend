import express from "express";
import Fachada from "../control/Fachada";
import Inativacao from "../model/entidade/inativacao";

export const InativacaoRouter = express.Router();

let fachada = new Fachada();

InativacaoRouter.get("/", async (req, res) => { 
    let listaInativacao: Array<Inativacao> = (await fachada.consultar(
      new Inativacao()
    )) as Array<Inativacao>;   
    res.json({message: "OK", dados: listaInativacao});
  });