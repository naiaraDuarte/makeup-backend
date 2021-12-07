import IDAO from "./IDAO";
import EntidadeDominio from "../entidade/entidadeDominio";
import { db } from "../../db.config";
import Endereco from "../entidade/endereco";

export default class EnderecoDAO implements IDAO {
  async consultarPedido(entidade: EntidadeDominio, id: Number): Promise<EntidadeDominio[]> {
    
    let endereco = db.query("SELECT * from ENDERECOS WHERE end_id = $1",[id]);
    let result: any;
    
    result = await endereco.then((dados) => {
      return (result = dados.rows.map((enderecos) => {
        return enderecos as Endereco;
      }));
    });

    return result;;
  }
  async salvar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
    const endereco = entidade as Endereco;

    let idEndereco = await db.query(
      "INSERT INTO ENDERECOS(end_nome, end_cep, end_logradouro, end_numero, end_complemento, end_bairro, end_cidade, end_uf, end_pais, end_tip_res_id, end_tip_log_id, end_tip_end_id, end_cli_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING end_id",
      [
        endereco.nome,
        endereco.cep,
        endereco.logradouro,
        endereco.numero,
        endereco.complemento,
        endereco.bairro,
        endereco.cidade,
        endereco.uf,
        endereco.pais,
        endereco.tipoResidencia,
        endereco.tipoLogradouro,
        endereco.tipoEndereco,
        endereco.idCliente,
      ]
    );
    entidade.id = idEndereco.rows[0].id;
    return entidade as Endereco;
  }
  async alterar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
    const endereco = entidade as Endereco;
    await db.query(
      "UPDATE ENDERECOS SET end_nome=$1, end_cep=$2, end_logradouro=$3, end_numero=$4, end_complemento=$5, end_bairro=$6, end_cidade=$7, end_uf=$8, end_pais=$9, end_tip_res_id=$10, end_tip_log_id=$11, end_tip_end_id=$12, end_cli_id=$13 WHERE end_id= $14",
      [
        endereco.nome,
        endereco.cep,
        endereco.logradouro,
        endereco.numero,
        endereco.complemento,
        endereco.bairro,
        endereco.cidade,
        endereco.uf,
        endereco.pais,
        endereco.tipoResidencia,
        endereco.tipoLogradouro,
        endereco.tipoEndereco,
        endereco.idCliente,
        endereco.id,
      ]
    );
    return entidade as Endereco;
  }
  inativar(entidade: EntidadeDominio): boolean {
    const endereco = entidade as Endereco;
    db.query("UPDATE ENDERECOS SET end_ativo = false WHERE end_id=$1", [endereco.id]);
    return true;
  }
  consultar(): Promise<EntidadeDominio[]> {
    throw new Error("Method not implemented.");
  }
  async consultarComId(entidade: EntidadeDominio): Promise<Array<EntidadeDominio>> {
    const endereco = entidade as Endereco;
    let end = db.query("SELECT * FROM ENDERECOS WHERE end_cli_id = $1 AND end_ativo = true", [endereco.idCliente]);
    let result: Array<EntidadeDominio> = [];

    result = await end.then((dados) => {
      return (result = dados.rows.map((cliente) => {
        return cliente as Endereco;
      }));
    });
    console.log(result)

    return result;
  }  
}
