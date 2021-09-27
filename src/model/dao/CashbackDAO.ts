import { db } from "../../db.config";
import Cashback from "../entidade/cashback";
import EntidadeDominio from "../entidade/entidade.model";
import entidadeModel from "../entidade/entidade.model";
import IDAO from "./IDAO";

export default class CashbackDAO implements IDAO {
    async salvar(entidade: entidadeModel): Promise<entidadeModel> {
        const cashback = entidade as Cashback;
        console.log("dao cashback");
        
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
        
        await db.query("UPDATE cashback SET valor=$1,  WHERE fk_cliente=$2",
        [
            cashback.valor,
            cashback.idCliente,            

        ]);
        return entidade as Cashback
    }
    excluir(entidade: entidadeModel): boolean {
        throw new Error("Method not implemented.");
    }
    async consultar(): Promise<entidadeModel[]> {
        let cashback = db.query("SELECT * FROM cashback");
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
        let cash = db.query("SELECT * FROM cashback WHERE fk_cliente = $1", [cashback.idCliente]);
        let result: Array<EntidadeDominio> = [];

        result = await cash.then((dados) => {
            return (result = dados.rows.map((cashback) => {
                return cashback;
            }));
        });
        return result;
    }

}