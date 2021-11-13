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
  // let categoria = {
  //   descricao: req.body.descricao,
  //   gpPrecificacao: req.body.gpPrecificacao
  // } 
  let pdt = req.body;  
  const produto = {
    id: req.params.id,
    cod: pdt.codigoProduto,
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

  console.log("1", produto.categoria.id )

  // produto.categoria.id = produto.categoria.id
  // produto.categoria.descricao = produto.categoria.nome
  // produto.categoria.gpPrecificacao = produto.categoria.mgLucro
  
  // console.log("1", produto)
  console.log("2", produto.categoria.nome)
  console.log("3", produto.categoria.mgLucro)  

  let conversao = Object.assign(new Produto(), produto);
  let listaProduto: any = await fachada.alterar(conversao as Produto);
  res.json({ message: "OK", dados: listaProduto });
});
ProdutoRouter.patch("/:id", async (req, res) => {
  let pdt = req.body;
  const produto = {
    id: req.params.id,
    quantidade: pdt.quantidadeProduto,
  };
  
  let conversao = Object.assign(new Produto(), produto);
  let listaProduto: any = await fachada.alterar(conversao as Produto);
  if (listaProduto.length < 1) {

    res.status(400).json({ status: 1 });
  }
  else {
    res.status(200).json({ status: 0, dados: listaProduto });
  }
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
  let categoria = {
    id: req.body.categoria.id,
    descricao: req.body.categoria.nome,
    gpPrecificacao: req.body.categoria.gpPrecificacao
  }
  
  
  let pdt = req.body
  const produto = {
    cod: pdt.codigoProduto,
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
    categoria: categoria,
    custo: pdt.custoProduto,
    descricao: pdt.descProduto,
  };
  

  let conversao = Object.assign(new Produto(), produto);
  let listaProduto: any = await fachada.cadastrar(conversao as Produto);

  res.json({ message: "OK", dados: listaProduto });
});


ProdutoRouter.get("/:id", async (req, res) => {
  const produto = {
    id: req.params.id,
  };
  let conversao = Object.assign(new Produto(), produto);
  let listaProduto: any = await fachada.consultarComId(conversao as Produto);
  
  res.json({ message: "OK", dados: listaProduto });
});

