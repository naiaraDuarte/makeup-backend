import IDAO from "./IDAO";
import EntidadeDominio from "../entidade/entidade.model";
import { db } from "../../db.config";
import Cliente from "../entidade/cliente.model";
import EnderecoDAO from "./EnderecoDAO";
import Endereco from "../entidade/endereco";
import Cartao from "../entidade/cartao.model";
import CartaoDAO from "./CartaoDAO";
import CashbackDAO from "./CashbackDAO";


export default class ClienteDAO implements IDAO {
  async salvar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
    console.log("dentro dao")
    const cliente = entidade as Cliente;
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

    // let enderecoDAO = new EnderecoDAO();
    // for (let i = 0; i < cliente.endereco.length; i++) {
    //   let endereco = Object.assign(new Endereco(), cliente.endereco[i]);
    //   endereco.idCliente = idCliente.rows[0].id;

    //   cliente.endereco[i] = Object.assign(
    //     new Endereco(),
    //     await enderecoDAO.salvar(endereco as Endereco)
    //   );
    // }
       
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
    }else{
      let key = Object.keys(cliente);
      let values = Object.values(cliente);
      await db.query(
        "UPDATE clientes SET " + key[1] +"=$1 WHERE id=$2",[values[1], values[0]]);

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
  async consultarCpf(entidade: EntidadeDominio): Promise<EntidadeDominio>{
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

  async consultarLogin(entidade: EntidadeDominio): Promise<Array<EntidadeDominio>>{
    const cliente = entidade as Cliente;
    let clientes = db.query("SELECT * FROM clientes WHERE email = $1 and senha = $2", [
      cliente.email,
      cliente.senha
    ]);
    
    let result: any;
    let clienteCompleto: any;

    result = await clientes.then((dados) => {
      return (result = dados.rows.map((cliente) => {
        return cliente as Cliente;
      }));
    });
    
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
}
