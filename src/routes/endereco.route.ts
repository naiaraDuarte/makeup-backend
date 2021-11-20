import express from "express";
import Fachada from "../control/Fachada";
import { TipoEndereco } from "../model/entidade/tipoEndereco";
import { TipoLogradouro } from "../model/entidade/tipoLogradouro";
import { TipoResidencia } from "../model/entidade/tipoResidencia";
import { Estado } from "../model/entidade/estado";
import Endereco from "../model/entidade/endereco";

export const EnderecoRouter = express.Router();

let fachada = new Fachada();

EnderecoRouter.get("/", async (req, res) => {
  res.json({ message: "OK" });
});
EnderecoRouter.post("/:id", async (req, res) => {
  let end = req.body   
  const endereco = {
    nome: end.nome,
    cep: end.cep,
    logradouro: end.logradouro,
    numero: end.numero,
    tipoEndereco: TipoEndereco[end.tipo_endereco],
    tipoResidencia: TipoResidencia[end.tipo_residencia],
    tipoLogradouro: TipoLogradouro[end.tipo_logradouro],
    bairro: end.bairro,
    cidade: end.cidade,
    uf: Estado[end.uf],
    pais: end.pais,
    complemento: end.complemento,
    idCliente: req.params.id,
  };
  console.log("rota", endereco )
  let conversao = Object.assign(new Endereco(), endereco);
  let listaEndereco: any = await fachada.cadastrar(conversao as Endereco);
  console.log("ra", listaEndereco)
  if (listaEndereco.msgn.length>0){
    console.log("erro")
    res.status(400).json({status: 1, mensagem: listaEndereco.msgn});    
  }
    else{
      console.log("ok")
      res.status(200).json({status: 0, dados: listaEndereco});
    }
});
EnderecoRouter.put("/:idCliente", async (req, res) => {
  let end = req.body;
  
  const endereco = {
    id: end.id,
    nome: end.nome,
    cep: end.cep,
    logradouro: end.logradouro,
    numero: end.numero,
    tipoEndereco: TipoEndereco[end.tipo_endereco],
    tipoResidencia: TipoResidencia[end.tipo_residencia],
    tipoLogradouro: TipoLogradouro[end.tipo_logradouro],
    bairro: end.bairro,
    cidade: end.cidade,
    uf: Estado[end.uf],
    pais: end.pais,
    complemento: end.complemento,
    idCliente: req.params.idCliente,
  };

  let conversao = Object.assign(new Endereco(), endereco);
  let listaCliente: any = await fachada.alterar(conversao as Endereco);

  if (listaCliente.msgn.length>1){
    res.status(400).json({status: 1, mensagem: listaCliente.msgn});    
  }
    else{
      res.status(200).json({status: 0, dados: listaCliente});
    }
});
EnderecoRouter.patch("/:id", async (req, res) => {
  const endereco = {
    id: req.params.id,
  };
  
  let conversao = Object.assign(new Endereco(), endereco);
  let listaCliente: boolean = await fachada.inativar(conversao as Endereco);

  res.json({ message: "OK", dados: listaCliente });
});
