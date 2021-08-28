import express from "express";
import Fachada from "../control/Fachada";
import ClienteDAO from "../model/dao/ClienteDAO";
import Cliente from "../model/entidade/cliente.model";

export const ClienteRouter = express.Router();

let fachada = new Fachada();

ClienteRouter.get("/", async (req, res) => {
  const clienteDAO = new ClienteDAO();
  let listaCliente: Array<Cliente> = (await fachada.consultar(
    new Cliente()
  )) as Array<Cliente>;
  res.json({ message: "OK", dados: listaCliente });
});

ClienteRouter.post("/:id", async (req, res) => {
  const cliente = {
    nome: req.body.nome,
    dataNasc: req.body.data_nasc,
    cpf: req.body.cpf,
    tipoTelefone: req.body.tipo_telefone,
    telefone: req.body.telefone,
    sexo: req.body.sexo,
    email: req.body.email,
    senha: req.body.senha,
  };
  let conversao = Object.assign(new Cliente(), cliente);
  let listaCliente: String = await fachada.cadastrar(conversao as Cliente);

  res.json({ message: "OK", dados: listaCliente });
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
  };
  let conversao = Object.assign(new Cliente(), cliente);
  let listaCliente: String = await fachada.alterar(conversao as Cliente);

  res.json({ message: "OK", dados: listaCliente });
});

ClienteRouter.delete("/:id", async (req, res) => {
  const cliente = {
    id: req.params.id,
  };
  let conversao = Object.assign(new Cliente(), cliente);
  let listaCliente: boolean = await fachada.excluir(conversao as Cliente);

  res.json({ message: "OK", dados: listaCliente });
});

ClienteRouter.post("/login", async (req, res) => {
  res.json({ message: "Deu certo mané" });
});

ClienteRouter.post("/cadastro", async (req, res) => {
  res.json({ message: "Deu certo mané" });
});
