import { db } from "../../db.config";
import Cashback from "../entidade/cashback";
import entidadeModel from "../entidade/entidade.model";
import IDAO from "./IDAO";

export default class CashbackDAO implements IDAO {
    async salvar(entidade: entidadeModel): Promise<entidadeModel> {
        const cashback = entidade as Cashback;
        console.log("dao cashback")
        let idCashback = await db.query(
            "INSERT INTO cashback (valor, fk_cliente) VALUES ($1, $2) RETURNING id",
            [
                cashback.valor,
                cashback.idCliente

            ]
        );
        entidade.id = idCashback.rows[0].id;
        return entidade as Cashback
    }

    async alterar(entidade: entidadeModel): Promise<entidadeModel> {
        const cashback = entidade as Cashback
        console.log ("alterar", cashback.idCliente)
        await db.query("UPDATE cashback SET valor=$1, fk_cliente=$2 WHERE id=$3",
        [
            cashback.valor,
            cashback.idCliente,
            cashback.id

        ]);
        return entidade as Cashback
    }
    excluir(entidade: entidadeModel): boolean {
        throw new Error("Method not implemented.");
    }
    consultar(): Promise<entidadeModel[]> {
        throw new Error("Method not implemented.");
    }
    consultarComId(entidade: entidadeModel): Promise<entidadeModel[]> {
        throw new Error("Method not implemented.");
    }

}
