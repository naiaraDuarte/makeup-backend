import { db } from "../../db.config";
import Categoria from "../entidade/categoria";
import EntidadeDominio from "../entidade/entidade.model";
import entidadeModel from "../entidade/entidade.model";
import IDAO from "./IDAO";

export default class CategoriaDAO implements IDAO {
    salvar(entidade: entidadeModel): Promise<entidadeModel> {
        throw new Error("Method not implemented.");
    }
    alterar(entidade: entidadeModel): Promise<entidadeModel> {
        throw new Error("Method not implemented.");
    }
    excluir(entidade: entidadeModel): boolean {
        throw new Error("Method not implemented.");
    }
    async consultar(): Promise<entidadeModel[]> {
        console.log("dao cat")
        let categorias = db.query("SELECT * FROM categorias");
        let result: Array<EntidadeDominio> = [];

        result = await categorias.then((dados) => {
            return (result = dados.rows.map((categoria) => {

                return categoria as Categoria;
            }));
        });

        return result;
    }
    consultarComId(entidade: entidadeModel): Promise<entidadeModel[]> {
        throw new Error("Method not implemented.");
    }
    consultarPedido(entidade: entidadeModel, id: Number): Promise<entidadeModel[]> {
        throw new Error("Method not implemented.");
    }

}
