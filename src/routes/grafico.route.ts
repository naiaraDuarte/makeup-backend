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

GraficoRouter.get("/:date", async (req, res) => {
  const filtro = {
    cod: req.params.date,
  };
  let conversao = Object.assign(new Filtro(), filtro);
  let listaFiltro: any = await fachada.consultarComId(conversao as Filtro);

  res.status(200).json({status: 0, dados: listaFiltro});


});

GraficoRouter.post("/", async (req, res) => {
  const filtro = {
    dateInicial: req.body.dataInicial,
    dateFinal: req.body.dataFinal

  };
  console.log("filtro", filtro)
  let conversao = Object.assign(new Filtro(), filtro);
  let listaFiltro: any = await fachada.consultarComId(conversao as Filtro);

  res.status(200).json({status: 0, dados: listaFiltro});

});
