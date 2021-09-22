import { db } from "../../db.config";
import Cashback from "../entidade/cashback";
import entidadeModel from "../entidade/entidade.model";
import IDAO from "./IDAO";

export default class CashbackDAO implements IDAO {
    async salvar(entidade: entidadeModel): Promise<entidadeModel> {
        const cashback= entidade as Cashback;
        let idCashback = await db.query( 
            "INSERT INTO cashback (valor, fk_cliente) VALUES ($1, $2) RETURNING id",
            [
                cashback.valor,
                cashback.IdCliente               
            
            ]
            );
        entidade.id = idCashback.rows[0].id;
        return entidade as Cashback
    }

    alterar(entidade: entidadeModel): Promise<entidadeModel> {
        throw new Error("Method not implemented.");
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
