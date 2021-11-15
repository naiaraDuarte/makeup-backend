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
  //   id: req.body.categoriaProduto.id,
  //   descricao: req.body.categoriaProduto.nome,
  //   gpPrecificacao: req.body.categoriaProduto.mgLucro
  //   }

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
    categoria: pdt.categoriaProduto,
    custo: pdt.custoProduto,
    descricao: pdt.descProduto,
  };
 
  let conversao = Object.assign(new Produto(), produto);
  let listaProduto: any = await fachada.alterar(conversao as Produto);
  res.json({ message: "OK", dados: listaProduto });
});

ProdutoRouter.patch("/:id", async (req, res) => {
    const produto = {
    id: req.params.id,
    quantidade: 1,
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

// ProdutoRouter.delete("/:id", async (req, res) => {
//   const produto = {
//     id: req.params.id,
//   };

//   let conversao = Object.assign(new Produto(), produto);
//   let prod: boolean = await fachada.excluir(conversao as Produto);

//   res.json({ message: "OK", dados: prod });
// });
ProdutoRouter.put("/inativacao/:id", async (req, res) =>{
  let produto = {
    id: req.params.id,
    observacao: req.body.observacao,
    catInativacao: req.body.categoriaInativacao,
    status: req.body.ativo
  }; 
  console.log(produto)
  let conversao = Object.assign(new Produto(), produto);
  let prod: boolean = await fachada.excluir(conversao as Produto);

  res.json({ message: "OK", dados: prod });
});

ProdutoRouter.post("/", async (req, res) => {
    let categoria = {
    id: req.body.categoriaProduto.id,
    descricao: req.body.categoriaProduto.nome,
    gpPrecificacao: req.body.categoriaProduto.mgLucro
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

  if (listaProduto.msgn.length > 0) {
    res.status(400).json({ status: 1 });
  }
  else {
    res.status(200).json({ status: 0, dados: listaProduto });
  }
});

ProdutoRouter.get("/:id", async (req, res) => {  
  const produto = {
    id: req.params.id,
  };
  let conversao = Object.assign(new Produto(), produto);
  let listaProduto: any = await fachada.consultarComId(conversao as Produto);
  
  res.json({ message: "OK", dados: listaProduto });
});

