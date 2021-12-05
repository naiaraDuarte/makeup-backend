import { db } from "../../db.config";
import Cashback from "../entidade/cashback";
import EntidadeDominio from "../entidade/entidadeDominio";
import entidadeModel from "../entidade/entidadeDominio";
import IDAO from "./IDAO";

export default class CashbackDAO implements IDAO {
    consultarPedido(entidade: EntidadeDominio, id: Number): Promise<EntidadeDominio[]> {
        throw new Error("Method not implemented.");
    }
    async salvar(entidade: entidadeModel): Promise<entidadeModel> {
        const cashback = entidade as Cashback;
               
        let idCashback = await db.query(
            "INSERT INTO CASHBACK (cash_valor, cash_cli_id) VALUES ($1, $2) RETURNING cash_id",
            [
                cashback.valor,
                cashback.idCliente

            ]
        );
        entidade.id = idCashback.rows[0].id;
        return entidade as Cashback
    }

    async alterar(entidade: entidadeModel): Promise<entidadeModel> {
        const cashback = entidade as Cashback;
        await db.query("UPDATE CASHBACK SET cash_valor=$1 WHERE cash_cli_id=$2",
        [
            cashback.valor,
            cashback.idCliente,            

        ]);
        return entidade as Cashback
    }
    inativar(entidade: entidadeModel): boolean {
        throw new Error("Method not implemented.");
    }
    async consultar(): Promise<entidadeModel[]> {
        let cashback = db.query("SELECT * FROM CASHBACK");
        let result: Array<EntidadeDominio> = [];

        result = await cashback.then((dados) => {
            return (result = dados.rows.map((cashback) => {
                return cashback as Cashback;
            }));
        });

        return result;
    }
    async consultarComId(entidade: entidadeModel): Promise<entidadeModel[]> {
        const cashback = entidade as Cashback;
        
        let cash = db.query("SELECT * FROM CASHBACK WHERE cash_cli_id = $1", [cashback.idCliente]);
        let result: Array<EntidadeDominio> = [];

        result = await cash.then((dados) => {
            return (result = dados.rows.map((cashback) => {
                return cashback;
            }));
        });
        return result;
    }
    async alterarQtde(entidade: entidadeModel): Promise<entidadeModel> {
        const cashback= entidade as Cashback;       
        await db.query(
          "UPDATE CASHBACK SET cash_valor=(cash_valor-$1) WHERE cash_cli_id=$2",
    
          [ cashback.valor,
              cashback.id]
        );
        return cashback
    
      }

}
