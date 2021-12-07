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
      "INSERT INTO CLIENTES (cli_nome, cli_data_nasc, cli_cpf, cli_tip_tel_id, cli_telefone, cli_sexo, cli_email, cli_senha, cli_apelido) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING cli_id",
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
    
    if (Object.keys(cliente).length > 3) {
      await db.query(
        "UPDATE CLIENTES SET cli_nome=$1, cli_data_nasc=$2, cli_cpf=$3, cli_tip_tel_id=$4, cli_telefone=$5, cli_sexo=$6, cli_email=$7, cli_senha=$8, cli_apelido=$9 WHERE cli_id=$10",
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
        "UPDATE CLIENTES SET " + key[1] + "=$1 WHERE cli_id=$2", [values[1], values[0]]);
    }
    return entidade as Cliente;
  }
  inativar(entidade: EntidadeDominio): boolean {
    const cliente = entidade as Cliente;
    db.query("UPDATE CLIENTES SET cli_ativo = false WHERE cli_id=$1", [
      cliente.id,
    ]);
    return true;
  }
  async consultar(): Promise<Array<EntidadeDominio>> {
    let clientes = db.query("SELECT * FROM CLIENTES WHERE cli_ativo = true");
    let result: any;

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
    let clientes = db.query("SELECT * FROM CLIENTES WHERE cli_id = $1", [
      cliente.id,
    ]);
    let result: any;
    result = await clientes.then((dados) => {
      return (result = dados.rows.map((cliente) => {

        return cliente as Cliente;
      }));
    });

    if (cliente.senha != null) {
      let senhaBD: string = result[0].cli_senha;      
      if (!await Encrypt.comparePassword(cliente.senha, senhaBD)) {        
        mensagem.push("Senha não confere");
        result.msgn = mensagem

        return result
      }

    }
    let enderecoDAO = new EnderecoDAO();
    let endereco = Object.assign(new Endereco());
    endereco.idCliente = result[0].cli_id;
    
    result.endereco = await enderecoDAO.consultarComId(endereco as Endereco);

    let cartaoDAO = new CartaoDAO();
    let cartao = Object.assign(new Cartao());
    cartao.idCliente = result[0].cli_id;
    result.cartao = await cartaoDAO.consultarComId(cartao as Cartao);

    return result;
  }
  async consultarCpf(entidade: EntidadeDominio): Promise<EntidadeDominio> {
    const cliente = entidade as Cliente;
    let clientes = db.query("SELECT * FROM CLIENTES WHERE cli_cpf = $1", [cliente.cpf]);
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

    let clientes = db.query("SELECT * FROM CLIENTES WHERE cli_email = $1", [
      cliente.email,
    ]);

    let result: any;

    result = await clientes.then((dados) => {
      return (result = dados.rows.map((cliente) => {

        return cliente as Cliente;
      }));
    });

    if (result.length < 1) {
      mensagem.push("Email não cadastrado");
      result.msgn = mensagem
      return result
    }

    let senhaBD = result[0].cli_senha
    
    if (await Encrypt.comparePassword(cliente.senha!, senhaBD)) {   
   
      let enderecoDAO = new EnderecoDAO();
      let endereco = Object.assign(new Endereco());
      endereco.idCliente = result[0].cli_id;
      result.endereco = await enderecoDAO.consultarComId(endereco as Endereco);

      let cartaoDAO = new CartaoDAO();
      let cartao = Object.assign(new Cartao());
      cartao.idCliente = result[0].cli_id;
      result.cartao = await cartaoDAO.consultarComId(cartao as Cartao);
      return result;
    }

    mensagem.push("Dados não conferem");
    result.msgn = mensagem

    return result;
  }
  async consultarPedido(entidade: EntidadeDominio, id: Number): Promise<EntidadeDominio[]> {
    let clientes = db.query("SELECT * from CLIENTES WHERE cli_id = $1", [
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
