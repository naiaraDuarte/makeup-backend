import express from "express";
import { idText } from "typescript";
import Fachada from "../control/Fachada";
import Produto from "../model/entidade/produto";

export const ProdutoRouter= express.Router();

let fachada = new Fachada();

ProdutoRouter.get("/", async (req, res) => {
    let listaProduto: Array<Produto> = (await fachada.consultar(
    new Produto())) as Array<Produto>;
      res.json({ message: "OK", dados: listaProduto });
    }); 

// ProdutoRouter.get("/", async (req, res) => {
//     res.json({ message: "OK" })
// }); 

ProdutoRouter.put("/:id", async (req, res) => {
    let pdt = req.body;
    const produto = {
        id : req.params.id,
        cod: pdt.cod,
        nome: pdt.nome,
        marca: pdt.marca,
        tipo: pdt.tipo,
        peso: pdt.peso,
        altura: pdt.altura,
        comprimento: pdt.comprimento,
        quantidade:pdt.quantidade,
        imagem: pdt.imagem,
        largura: pdt.largura,
        diametro: pdt.diametro,
        categoria: pdt.categoria,
        custo: pdt.custo,
        descricao: pdt.descricao,     
        
    };

    let conversao = Object.assign(new Produto(), produto);
    let listaProduto: any = await fachada.alterar(conversao as Produto);
    res.json({ message: "OK", dados: listaProduto });
});


