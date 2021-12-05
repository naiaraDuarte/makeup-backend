import { db } from "../../db.config";
import Categoria from "../entidade/categoria";
import EntidadeDominio from "../entidade/entidadeDominio";
import Produto from "../entidade/produto";

import IDAO from "./IDAO";

export default class CategoriaDAO implements IDAO {
    async salvar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
        const categoria = entidade as Categoria;
        let idCategoria = await db.query(
            "INSERT INTO CATEGORIAS (cat_descricao, cat_gp_precificacao) VALUES ($1, $2) RETURNING cat_id",
            [categoria.descricao,
            categoria.gpPrecificacao,]
        );
        entidade.id = idCategoria.rows[0].id;
        return entidade as Categoria;
    }
    async alterar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
        const categoria = entidade as Categoria;


        await db.query(
            "UPDATE CATEGORIAS SET cat_descricao=$1, cat_gp_precificacao=$2 WHERE cat_id=$3",

            [categoria.descricao, categoria.gpPrecificacao, categoria.id]
        );


        return entidade as Categoria;
    }
    inativar(entidade: EntidadeDominio): boolean {
        const categoria = entidade as Categoria;
        db.query("UPDATE CATEGORIAS SET cat_ativo = false WHERE cat_id=$1", [categoria.id]);
        return true;

    }
    async consultar(): Promise<EntidadeDominio[]> {
        let categorias = db.query("SELECT * FROM CATEGORIAS ORDER BY cat_id");
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
       
        let cat = db.query("SELECT * FROM CATEGORIAS WHERE cat_descricao = $1", [produto.categoria]);
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
