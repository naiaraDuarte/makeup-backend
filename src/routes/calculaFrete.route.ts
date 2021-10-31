import express from "express";

export const CalculaFreteRouter = express.Router();
let Correios = require("node-correios");
let correios = new Correios();

CalculaFreteRouter.post("/", async (req, res) => {
  let dados = req.body;
  const frete = {
    nCdServico: "40010",
    sCepOrigem: "08579100",
    sCepDestino: dados.cep,
    nVlPeso: dados.peso,
    nCdFormato: 1,
    nVlComprimento: dados.comprimento,
    nVlAltura: dados.altura,
    nVlLargura: dados.largura,
    nVlDiametro: dados.diametro,
  };
  correios
    .calcPreco(frete)
    .then((result: any) => {
        
      res.json({ message: "OK", valor: result });
    })
    .catch((error: any) => {
      res.json({ message: "OK", erro: error });
     
    });
});
