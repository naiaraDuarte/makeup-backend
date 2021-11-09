import express from "express";
import Fachada from "../control/Fachada";
import Filtro from "../model/entidade/filtro";


export const GraficoRouter = express.Router();

let fachada = new Fachada();

// GraficoRouter.get("/", async (req, res) => {
//   let listaCupom: Array<Cupom> = (await fachada.consultar(
//     new Cupom()
//   )) as Array<Cupom>;
//   res.json({ message: "OK", dados: listaCupom });
// });

GraficoRouter.get("/", async (req, res) => {
  let listaFiltro: any = await fachada.consultar(new Filtro());
  
  res.status(200).json({ status: 0, dados: listaFiltro });
});

GraficoRouter.post("/", async (req, res) => {
  const filtro = {    
    status: req.body.status,
    fluxo: req.body.fluxo
  };

  let conversao = Object.assign(new Filtro(), filtro);
  let listaFiltro: any = await fachada.consultarPedido(conversao as Filtro, filtro.status);

  res.status(200).json({ status: 0, dados: listaFiltro });

});

GraficoRouter.post("/data", async (req, res) => {
  const filtro = {
    dataInicial: req.body.dataInicial,
    dataFinal: req.body.dataFinal,
    status: req.body.status,
    fluxo: req.body.fluxo
  };

    
    var day = 86400000
    var date = new Date(filtro.dataInicial);
    var date1 = new Date(filtro.dataFinal);
    filtro.dataInicial = new Date((date.getTime() - day));
    filtro.dataFinal = new Date((date1.getTime() + day));
  

  let conversao = Object.assign(new Filtro(), filtro);
  let listaFiltro: any = await fachada.consultarComId(conversao as Filtro);

  res.status(200).json({ status: 0, dados: listaFiltro });
});


