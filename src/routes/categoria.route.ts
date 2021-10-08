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