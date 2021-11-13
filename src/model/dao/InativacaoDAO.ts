import { db } from "../../db.config";
import Categoria from "../entidade/categoria";
import EntidadeDominio from "../entidade/entidadeDominio";
import Inativacao from "../entidade/inativacao";
;

import IDAO from "./IDAO";

export default class InativacaoDAO implements IDAO {
    salvar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
        throw new Error("Method not implemented.");
    }
    alterar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
        throw new Error("Method not implemented.");
    }
    excluir(entidade: EntidadeDominio): boolean {
        throw new Error("Method not implemented.");
    }
    async consultar(): Promise<EntidadeDominio[]> {
        let inativacoes = db.query("SELECT * FROM motivo_inativacao");
        let result: Array<EntidadeDominio> = [];

        result = await inativacoes.then((dados) => {
            return (result = dados.rows.map((inativacao) => {

                return inativacao as Inativacao;
            }));
        });

        return result;
    }
    consultarComId(entidade: EntidadeDominio): Promise<EntidadeDominio[]> {
        throw new Error("Method not implemented.");
    }
    consultarPedido(entidade: EntidadeDominio, id: Number): Promise<EntidadeDominio[]> {
        throw new Error("Method not implemented.");
    }

}