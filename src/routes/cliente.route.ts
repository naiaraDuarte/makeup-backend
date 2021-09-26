import express from "express";
import Fachada from "../control/Fachada";
import Cliente from "../model/entidade/cliente.model";
import { TipoEndereco } from "../model/entidade/tipoEndereco";
import { TipoLogradouro } from "../model/entidade/tipoLogradouro";
import { TipoResidencia } from "../model/entidade/tipoResidencia";
import { Estado } from "../model/entidade/estado";
import { BandeiraCartao } from "../model/entidade/bandeiraCartao";
import Endereco from "../model/entidade/endereco";
import EntidadeDominio from "../model/entidade/entidade.model";

export const ClienteRouter = express.Router();

let fachada = new Fachada();

ClienteRouter.post("/login", async (req, res) => {
  const cliente = {
    email: req.body.email,
    senha: req.body.senha,
  };

  let conversao = Object.assign(new Cliente(), cliente);
  let listaCliente: any = await fachada.consultarLogin(conversao as Cliente);
  listaCliente = listaCliente as Cliente;

  res.json({ message: "OK", cliente: listaCliente, endereco: listaCliente.endereco, cartao: listaCliente.cartao });
});

ClienteRouter.get("/", async (req, res) => {
  let listaCliente: Array<Cliente> = (await fachada.consultar(
    new Cliente()
  )) as Array<Cliente>;
  res.json({ message: "OK", dados: listaCliente });
});

ClienteRouter.post("/", async (req, res) => {
  let endereco = req.body.endereco;
  let arrayEndereco: any = [];
  endereco.forEach((end: any) => {
    arrayEndereco.push({
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
    });
  });

  const cliente = {
    nome: req.body.nome,
    dataNasc: req.body.data_nasc,
    cpf: req.body.cpf,
    tipoTelefone: req.body.tipo_telefone,
    telefone: req.body.telefone,
    sexo: req.body.sexo,
    email: req.body.email,
    senha: req.body.senha,
    endereco: arrayEndereco,
    apelido: req.body.apelido,

  };

  let conversao = Object.assign(new Cliente(), cliente);
  let cli = await fachada.cadastrar(conversao);

  let enderecos: Endereco[] = arrayEndereco.map((e: any) => Object.assign(new Endereco(cli.id), e));
  let resultEnd: EntidadeDominio[] = [];
  enderecos.forEach(async (e) => {
    let msg2 = await fachada.cadastrar(e);
    resultEnd.push(msg2);

  });
  
  
  res.json({ message: "OK", Cliente: cli});

});

ClienteRouter.put("/:id", async (req, res) => {
  const cliente = {
    id: req.params.id,
    nome: req.body.nome,
    dataNasc: req.body.data_nasc,
    cpf: req.body.cpf,
    tipoTelefone: req.body.tipo_telefone,
    telefone: req.body.telefone,
    sexo: req.body.sexo,
    email: req.body.email,
    senha: req.body.senha,
    apelido: req.body.apelido,
  };


  let conversao = Object.assign(new Cliente(), cliente);
  let listaCliente: any = await fachada.alterar(conversao as Cliente);

  res.json({ message: "OK", dados: listaCliente });
});


ClienteRouter.patch("/:id", async (req, res) => {
  let cliente = {};

  if (req.body.email) {
    cliente = {
      id: req.params.id,
      email: req.body.email
    }
  } else if (req.body.senha) {
    cliente = {
      id: req.params.id,
      senha: req.body.senha
    }
  }

  let conversao = Object.assign(new Cliente(), cliente);
  let listaCliente: any = await fachada.alterar(conversao as Cliente);

  res.json({ message: "OK", dados: listaCliente });

})

ClienteRouter.get("/:id", async (req, res) => {
  const cliente = {
    id: req.params.id,
  };
  let conversao = Object.assign(new Cliente(), cliente);
  let listaCliente: any = await fachada.consultarComId(conversao as Cliente);

  res.json({ message: "OK", cliente: listaCliente, endereco: listaCliente.endereco, cartao: listaCliente.cartao });
});
