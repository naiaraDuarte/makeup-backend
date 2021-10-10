import express from "express";
import { idText } from "typescript";
import Fachada from "../control/Fachada";
import Cashback from "../model/entidade/cashback";

export const CashbackRouter = express.Router();

let fachada = new Fachada();

CashbackRouter.get("/", async (req, res) => {
    let listaCashback: Array<Cashback> = (await fachada.consultar(
        new Cashback())) as Array<Cashback>;
    res.json({ message: "OK", dados: listaCashback });
});

CashbackRouter.get("/:id", async (req, res) => {
    const cashback = {
      idCliente: req.params.id,
    };
    let conversao = Object.assign(new Cashback(), cashback);
    let listaCashback: any = await fachada.consultarComId(conversao as Cashback);
  
    res.json({ message: "OK", cashback: listaCashback});
  });

// CashbackRouter.post("/", async (req, res) => {
//     let cash = req.body
//     const cashback = {
//        idCliente: cash.id,
//        valor: cash.valor
//     };
//     let conversao = Object.assign(new Cashback(), cashback);
//     let listaCashback: any = await fachada.cadastrar(conversao as Cashback);

//     res.json({ message: "OK", Cashback: listaCashback });
// });
CashbackRouter.put("/:id", async (req, res) => {
    let cash= req.body;
    const cashback = {
        idCliente: req.params.id,
        valor: cash.valor               
        
    };

    let conversao = Object.assign(new Cashback(), cashback);
    let listaCashback: any = await fachada.alterar(conversao as Cashback);
    
          res.status(200).json({status: 0, message: listaCashback});
        
});

// CashbackRouter.delete("/:id", async (req, res) => {
//     const cashback = {
//       id: req.params.id,
//     };
//     let conversao = Object.assign(new Cashback(), cashback);
//     let cash: boolean = await fachada.excluir(conversao as Cashback);

//   res.json({ message: "OK", dados: cash});
// });

