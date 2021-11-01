import express from "express";
import Fachada from "../control/Fachada";
import Cupom from "../model/entidade/cupom";

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
//   let conversao = Object.assign(new Cupom(), cupom);
//   let listaCupom: any = await fachada.consultarComId(conversao as Cupom);

//   if (listaCupom.length<1){
    
//     res.status(400).json({status: 1});   
//   }
//   else{
//       res.status(200).json({status: 0, cupom: listaCupom});
//     }
});

GraficoRouter.post("/", async (req, res) => {
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
