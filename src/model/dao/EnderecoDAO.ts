import IDAO from "./IDAO";
import EntidadeDominio from "../entidade/entidade.model";
import { db } from "../../db.config";
import Endereco from "../entidade/endereco";

export default class EnderecoDAO implements IDAO {
  async salvar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
    const endereco = entidade as Endereco;

    let idEndereco = await db.query(
      "INSERT INTO enderecos(nome, cep, logradouro, numero, complemento, bairro, cidade, uf, pais, tipo_residencia, tipo_logradouro, tipo_endereco, fk_cliente) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id",
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
    await db.query('UPDATE public.enderecos SET nome=$1, cep=$2, logradouro=$3, numero=$4, complemento=$5, bairro=$6, cidade=$7, uf=$8, pais=$9, tipo_residencia=$10, tipo_logradouro=$11, tipo_endereco=$12, fk_cliente=$13 WHERE id= $14', [
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
        endereco.id
      ]);
    return entidade as Endereco;
  }
  excluir(entidade: EntidadeDominio): boolean {
    const endereco = entidade as Endereco;
    db.query("DELETE FROM enderecos WHERE id=$1", [
        endereco.id,
    ]);
    return true;
  }
  consultar(): Promise<EntidadeDominio[]> {
    throw new Error("Method not implemented.");
  }
  consultar2(entidade: EntidadeDominio): Promise<EntidadeDominio> {
    throw new Error("Method not implemented.");
  }
}
