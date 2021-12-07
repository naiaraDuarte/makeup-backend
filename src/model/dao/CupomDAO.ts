import entidadeModel from "../entidade/entidadeDominio";
import Cupom from "../entidade/cupom";
import IDAO from "./IDAO";
import { db } from "../../db.config";
import EntidadeDominio from "../entidade/entidadeDominio";

export default class CupomDAO implements IDAO {

  async salvar(entidade: entidadeModel): Promise<entidadeModel> {
    const cupom = entidade as Cupom;
    let idCupom = await db.query(
      "INSERT INTO cupons (cup_porcen, cup_quant, cup_tipo, cup_cod) VALUES ($1, $2, $3, $4) RETURNING cup_id",
      [cupom.porcen, cupom.quant, cupom.tipo, cupom.cod]
    );
    entidade.id = idCupom.rows[0].id;
    return entidade as Cupom;
  }
  async alterar(entidade: entidadeModel): Promise<entidadeModel> {
    const cupom = entidade as Cupom;
   
    if (Object.keys(cupom).length > 3) {
      await db.query(
        "UPDATE cupons SET cup_porcen=$1, cup_quant=$2, cup_tipo=$3, cup_cod=$4 WHERE cup_id=$5",

        [cupom.porcen, cupom.quant, cupom.tipo, cupom.cod, cupom.id]
      );
    } else {
      let key = Object.keys(cupom);
      let values = Object.values(cupom);
      await db.query("UPDATE cupons SET " + key[1] + "=$1 WHERE id=$2", [
        values[1],
        values[0],
      ]);
    }

    return entidade as Cupom;
  }
  inativar(entidade: EntidadeDominio): boolean {
    const cupom = entidade as Cupom;
    db.query("UPDATE cupons SET cup_ativo = false WHERE cup_id=$1", [cupom.id]);
    return true;
  }

  async consultar(): Promise<entidadeModel[]> {
    let cupons = db.query("SELECT * FROM cupons WHERE cup_ativo= true ");
    let result: Array<EntidadeDominio> = [];

    result = await cupons.then((dados) => {
      return (result = dados.rows.map((cupom) => {
        return cupom as Cupom;
      }));
    });

    return result;
  }
  async consultarComId(
    entidade: EntidadeDominio
  ): Promise<Array<EntidadeDominio>> {
    const cupom = entidade as Cupom;
    let cup = db.query("SELECT * FROM cupons WHERE cup_cod = $1 AND cup_ativo = true AND cup_quant > 0", [
      cupom.cod,
    ]);
    let result: Array<EntidadeDominio> = [];

    result = await cup.then((dados) => {
      return (result = dados.rows.map((cupom) => {
        return cupom;
      }));
    });
    return result;
  }
  async consultarPedido(entidade: entidadeModel, id: Number): Promise<entidadeModel[]> {

    let cupons = db.query("SELECT * from cupons WHERE cup_id IN (SELECT pgt_cup_id FROM pagamentos WHERE pgt_id IN (SELECT ped_pgt_id FROM pedidos WHERE ped_id = $1))", [
      id
    ])
    let result: any;

    result = await cupons.then((dados) => {
      return (result = dados.rows.map((cupom) => {
        return cupom as Cupom;
      }));
    });

    return result;
  }
  async alterarQtde(entidade: entidadeModel): Promise<entidadeModel> {
    const cupom = entidade as Cupom;
    await db.query(
      "UPDATE cupons SET cup_quant=(cup_quant-1) WHERE cup_id=$1",

      [cupom.id]
    );
    return cupom

  }
}
