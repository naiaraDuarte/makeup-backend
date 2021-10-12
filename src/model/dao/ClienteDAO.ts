import IDAO from "./IDAO";
import EntidadeDominio from "../entidade/entidadeDominio";
import { db } from "../../db.config";
import Cliente from "../entidade/cliente.model";
import EnderecoDAO from "./EnderecoDAO";
import Endereco from "../entidade/endereco";
import Cartao from "../entidade/cartao.model";
import CartaoDAO from "./CartaoDAO";
import { Encrypt } from "../../utils/encrypt";


export default class ClienteDAO implements IDAO {
  async salvar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
    const cliente = entidade as Cliente;
    cliente.senha = await Encrypt.cryptPassword(cliente.senha!);
    let idCliente = await db.query(
      "INSERT INTO clientes (nome, data_nasc, cpf, tipo_telefone, telefone, sexo, email, senha, apelido) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id",
      [
        cliente.nome,
        cliente.dataNasc,
        cliente.cpf,
        cliente.tipoTelefone,
        cliente.telefone,
        cliente.sexo,
        cliente.email,
        cliente.senha,
        cliente.apelido,
      ]
    );
    entidade.id = idCliente.rows[0].id;

    return entidade as Cliente;
  }

  async alterar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
    const cliente = entidade as Cliente;

    if (Object.keys(cliente).length > 2) {
      await db.query(
        "UPDATE clientes SET nome=$1, data_nasc=$2, cpf=$3, tipo_telefone=$4, telefone=$5, sexo=$6, email=$7, senha=$8, apelido=$9 WHERE id=$10",
        [
          cliente.nome,
          cliente.dataNasc,
          cliente.cpf,
          cliente.tipoTelefone,
          cliente.telefone,
          cliente.sexo,
          cliente.email,
          cliente.senha,
          cliente.apelido,
          cliente.id,
        ]
      );
    } else {
      let key = Object.keys(cliente);
      let values = Object.values(cliente);
      await db.query(
        "UPDATE clientes SET " + key[1] + "=$1 WHERE id=$2", [values[1], values[0]]);

    }

    return entidade as Cliente;
  }
  excluir(entidade: EntidadeDominio): boolean {
    const cliente = entidade as Cliente;
    let clientes = db.query("UPDATE clientes SET ativo = false WHERE id=$1", [
      cliente.id,
    ]);
    return true;
  }
  async consultar(): Promise<Array<EntidadeDominio>> {
    let clientes = db.query("SELECT * FROM clientes WHERE ativo = true");
    let result: Array<EntidadeDominio> = [];

    result = await clientes.then((dados) => {
      return (result = dados.rows.map((cliente) => {

        return cliente as Cliente;
      }));
    });

    return result;
  }

  async consultarComId(entidade: EntidadeDominio): Promise<Array<EntidadeDominio>> {
    const cliente = entidade as Cliente;
    let mensagem = [];
    let clientes = db.query("SELECT * FROM clientes WHERE id = $1", [
      cliente.id,
    ]);
    let result: any;
    let enderecos: any = [];
    let clienteCompleto: any;

    result = await clientes.then((dados) => {
      return (result = dados.rows.map((cliente) => {

        return cliente as Cliente;
      }));
    });
    // console.log("cliente senha", cliente.senha, "senha bd", result[0].senha)
    if (cliente.senha != null) {
      let senhaBD: string = result[0].senha;
      console.log ("senha bd", senhaBD)
      if (!await Encrypt.comparePassword(cliente.senha, senhaBD)) {
        mensagem.push("Senha não confere");
        result.msgn = mensagem
        console.log("resultadoo", result)
            
        return result
      }

    }
    let enderecoDAO = new EnderecoDAO();
    let endereco = Object.assign(new Endereco());
    endereco.idCliente = result[0].id;
    result.endereco = await enderecoDAO.consultarComId(endereco as Endereco);

    let cartaoDAO = new CartaoDAO();
    let cartao = Object.assign(new Cartao());
    cartao.idCliente = result[0].id;
    result.cartao = await cartaoDAO.consultarComId(cartao as Cartao);
    return result;
  }
  async consultarCpf(entidade: EntidadeDominio): Promise<EntidadeDominio> {
    const cliente = entidade as Cliente;
    let clientes = db.query("SELECT * FROM clientes WHERE cpf = $1", [cliente.cpf]);
    let result: any;

    result = await clientes.then((dados) => {
      return (result = dados.rows.map((cliente) => {
        return cliente as Cliente;
      }));
    });
    return result;

  }

  async consultarLogin(entidade: EntidadeDominio): Promise<Array<EntidadeDominio>> {
    const cliente = entidade as Cliente;
    let mensagem = [];

    let clientes = db.query("SELECT * FROM clientes WHERE email = $1", [
      cliente.email,
      ]);
    
    let result: any;
    let clienteCompleto: any;

    result = await clientes.then((dados) => {
      return (result = dados.rows.map((cliente) => {

        return cliente as Cliente;
      }));
    });
    console.log("result", result)

    if (result.length < 1) {
      mensagem.push("Email não cadastrado");
      result.msgn = mensagem
      return result
    }

    let senhaBD = result[0].senha
    console.log("senha", cliente.senha)


    if (await Encrypt.comparePassword(cliente.senha!, senhaBD)) {
      let enderecoDAO = new EnderecoDAO();
      let endereco = Object.assign(new Endereco());
      endereco.idCliente = result[0].id;
      result.endereco = await enderecoDAO.consultarComId(endereco as Endereco);

      let cartaoDAO = new CartaoDAO();
      let cartao = Object.assign(new Cartao());
      cartao.idCliente = result[0].id;
      result.cartao = await cartaoDAO.consultarComId(cartao as Cartao);
      return result;
    }


    mensagem.push("Dados não conferem");
    result.msgn = mensagem

    return result;
  }
  async consultarPedido(entidade: EntidadeDominio, id: Number): Promise<EntidadeDominio[]> {
    let clientes = db.query("SELECT * from clientes WHERE id = $1", [
      id
    ])
    let result: any;

    result = await clientes.then((dados) => {
      return (result = dados.rows.map((cliente) => {
        return cliente as Cliente;
      }));
    });

    return result;
  }
  
}
