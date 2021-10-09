import express from "express";
import Fachada from "../control/Fachada";
import Produto from "../model/entidade/produto";

export const ProdutoRouter = express.Router();

let fachada = new Fachada();

ProdutoRouter.get("/", async (req, res) => {
  let listaProduto: Array<Produto> = (await fachada.consultar(
    new Produto())) as Array<Produto>;
  res.json({ message: "OK", dados: listaProduto });
});

ProdutoRouter.put("/:id", async (req, res) => {
  let pdt = req.body;
  const produto = {
    id: req.params.id,
    codigo: pdt.codigoProduto,
    nome: pdt.nomeProduto,
    marca: pdt.marcaProduto,
    tipo: pdt.tipoProduto,
    peso: pdt.pesoProduto,
    altura: pdt.alturaProduto,
    comprimento: pdt.comprimentoProduto,
    quantidade: pdt.quantidadeProduto,
    imagem: pdt.imagem,
    largura: pdt.larguraProduto,
    diametro: pdt.diametroProduto,
    categoria: pdt.categoriaProduto,
    custo: pdt.custoProduto,
    preco: pdt.precoProduto,
    descricao: pdt.descProduto,

  };

  let conversao = Object.assign(new Produto(), produto);
  let listaProduto: any = await fachada.alterar(conversao as Produto);
  console.log(conversao)
  res.json({ message: "OK", dados: listaProduto });
});

ProdutoRouter.delete("/:id", async (req, res) => {
  const produto = {
    id: req.params.id,
  };

  let conversao = Object.assign(new Produto(), produto);
  let prod: boolean = await fachada.excluir(conversao as Produto);

  res.json({ message: "OK", dados: prod });
});

ProdutoRouter.post("/", async (req, res) => {
  let pdt = req.body
  const produto = {
    nome: pdt.nomeProduto,
    marca: pdt.marcaProduto,
    tipo: pdt.tipoProduto,
    peso: pdt.pesoProduto,
    altura: pdt.alturaProduto,
    comprimento: pdt.comprimentoProduto,
    quantidade: pdt.quantidadeProduto,
    imagem: pdt.imagem,
    largura: pdt.larguraProduto,
    diametro: pdt.diametroProduto,
    categoria: pdt.categoriaProduto,
    custo: pdt.custoProduto,
    descricao: pdt.descricaoProduto,
  };

  let conversao = Object.assign(new Produto(), produto);
  let listaProduto: any = await fachada.cadastrar(conversao as Produto);

  res.json({ message: "OK", produto: listaProduto });
});


ProdutoRouter.get("/:id", async (req, res) => {
  const produto = {
    id: req.params.id,
  };
  let conversao = Object.assign(new Produto(), produto);
  let listaProduto: any = await fachada.consultarComId(conversao as Produto);
  console.log("pdt", listaProduto)

  res.json({ message: "OK", produto: listaProduto });
});

