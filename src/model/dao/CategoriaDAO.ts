import { db } from "../../db.config";
import Categoria from "../entidade/categoria";
import EntidadeDominio from "../entidade/entidadeDominio";
import Produto from "../entidade/produto";

import IDAO from "./IDAO";

export default class CategoriaDAO implements IDAO {
    async salvar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
        const categoria = entidade as Categoria;
        let idCategoria = await db.query(
            "INSERT INTO categorias (descricao, gp_precificacao) VALUES ($1, $2) RETURNING id",
            [categoria.descricao,
            categoria.gpPrecificacao,]
        );
        entidade.id = idCategoria.rows[0].id;
        return entidade as Categoria;
    }
    async alterar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
        const categoria = entidade as Categoria;


        await db.query(
            "UPDATE categorias SET descricao=$1, gp_precificacao=$2 WHERE id=$3",

            [categoria.descricao, categoria.gpPrecificacao, categoria.id]
        );


        return entidade as Categoria;
    }
    excluir(entidade: EntidadeDominio): boolean {
        const categoria = entidade as Categoria;
        db.query("UPDATE categorias SET ativo = false WHERE id=$1", [categoria.id]);
        return true;

    }
    async consultar(): Promise<EntidadeDominio[]> {
        let categorias = db.query("SELECT * FROM categorias");
        let result: Array<EntidadeDominio> = [];

        result = await categorias.then((dados) => {
            return (result = dados.rows.map((categoria) => {

                return categoria as Categoria;
            }));
        });

        return result;
    }
    async consultarComId(entidade: EntidadeDominio): Promise<EntidadeDominio[]> {
        const produto = entidade as Produto;
       
        let cat = db.query("SELECT * FROM categorias WHERE descricao = $1", [produto.categoria]);
        let result: Array<EntidadeDominio> = [];

        result = await cat.then((dados) => {
            return (result = dados.rows.map((categoria) => {
                return categoria;
            }));
        });
        return result;
    }
    consultarPedido(entidade: EntidadeDominio, id: Number): Promise<EntidadeDominio[]> {
        throw new Error("Method not implemented.");
    }

}
