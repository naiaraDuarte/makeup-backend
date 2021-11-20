import express from "express";
import Fachada from "../control/Fachada";
import Categoria from "../model/entidade/categoria";

export const CategoriaRouter = express.Router();

let fachada = new Fachada();

CategoriaRouter.get("/", async (req, res) => {
  let listaCategoria: Array<Categoria> = (await fachada.consultar(
    new Categoria()
  )) as Array<Categoria>;
  res.json({ message: "OK", dados: listaCategoria });
});
CategoriaRouter.post("/", async (req, res) => {
  let cat = req.body;
  const categoria = {
    descricao: cat.nome,
    gpPrecificacao: cat.mgLucro,
  };

  let conversao = Object.assign(new Categoria(), categoria);
  let listaCategoria: any = await fachada.cadastrar(conversao as Categoria);

  if (listaCategoria.msgn != null) {
    res.status(400).json({ status: 0, message: listaCategoria.msgn });
  }
  else {
    res.status(200).json({ status: 1, dados: listaCategoria });
  }
});
CategoriaRouter.put("/:id", async (req, res) => {
  let cat = req.body;
  const categoria = {
    id: req.params.id,
    descricao: cat.nome,
    gpPrecificacao: cat.mgLucro,
  };

  let conversao = Object.assign(new Categoria(), categoria);
  let listaCategoria: any = await fachada.alterar(conversao as Categoria);

  if (listaCategoria.msgn != null) {
    res.status(400).json({ status: 0, message: listaCategoria.msgn });
  }
  else {
    res.status(200).json({ status: 1, dados: listaCategoria });
  }
});
CategoriaRouter.patch("/:id", async (req, res) => {
  const categoria = {
    id: req.params.id,
  };
  let conversao = Object.assign(new Categoria(), categoria);
  let cat: boolean = await fachada.inativar(conversao as Categoria);

  if (cat){
    res.status(200).json({ message: "OK", dados: cat });
  }
  else{
    res.status(400).json({ message: "OK", dados: cat });

  }
  
});