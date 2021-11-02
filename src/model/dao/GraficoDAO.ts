import { db } from "../../db.config";
import EntidadeDominio from "../entidade/entidadeDominio";
import Filtro from "../entidade/filtro";
import IDAO from "./IDAO";


export default class FiltroDAO implements IDAO {
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
        let filtros = db.query("SELECT produtos.id, produtos.nome, DATE_PART('month', pedidos.data_cadastro) AS mes, to_char(pedidos.data_cadastro, 'TMMonth/YYYY') AS mes_completo, categorias.descricao, SUM(produtos_pedidos.qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.fk_produto = produtos.id INNER JOIN pedidos ON produtos_pedidos.fk_pedido = pedidos.id INNER JOIN categorias ON produtos.fk_categoria = categorias.id GROUP BY mes, mes_completo, produtos.nome, produtos.id, categorias.descricao ORDER BY mes, produtos.nome");
        let result: Array<EntidadeDominio> = [];

        result = await filtros.then((dados) => {
            return (result = dados.rows.map((filtro) => {

                return filtro as Filtro;
            }));
        });
        console.log("result", result)

        return result;

    }
    consultarPedido(entidade: EntidadeDominio, id: Number): Promise<EntidadeDominio[]> {
        throw new Error("Method not implemented.");
    }
    async consultarComId(entidade: EntidadeDominio): Promise<Array<EntidadeDominio>> {
        const filtro = entidade as Filtro
        let result: Array<EntidadeDominio>;
        let filtros;

        if (filtro.status == 1) {
            if (filtro.dataInicial == null) {
                filtros = db.query("SELECT DATE_PART('month', pedidos.data_cadastro) AS mes, to_char(pedidos.data_cadastro, 'TMMonth/YYYY') AS mes_completo,  categorias.descricao AS nome, categorias.id, SUM(produtos_pedidos.qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.fk_produto = produtos.id INNER JOIN pedidos ON produtos_pedidos.fk_pedido = pedidos.id INNER JOIN categorias ON produtos.fk_categoria = categorias.id GROUP BY mes, mes_completo, categorias.id, categorias.descricao ORDER BY mes, categorias.descricao")
            }
            else {
                filtros = db.query("SELECT DATE_PART('month', pedidos.data_cadastro) AS mes, to_char(pedidos.data_cadastro, 'TMMonth/YYYY') AS mes_completo,  categorias.descricao AS nome, categorias.id, SUM(produtos_pedidos.qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.fk_produto = produtos.id INNER JOIN pedidos ON produtos_pedidos.fk_pedido = pedidos.id INNER JOIN categorias ON produtos.fk_categoria = categorias.id WHERE pedidos.data_cadastro between $1 and $2 GROUP BY mes, mes_completo, categorias.id, categorias.descricao ORDER BY mes, categorias.descricao", [
                    filtro.dataInicial,
                    filtro.dataFinal
                ]);
            }
            result = await filtros.then((dados) => {
                return (result = dados.rows.map((filtro) => {
                    return filtro;
                }));
            });
        } else {
            if (filtro.dataInicial == null) {
                filtros = db.query("SELECT produtos.id, produtos.nome, DATE_PART('month', pedidos.data_cadastro) AS mes, to_char(pedidos.data_cadastro, 'TMMonth/YYYY') AS mes_completo, categorias.descricao, SUM(produtos_pedidos.qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.fk_produto = produtos.id INNER JOIN pedidos ON produtos_pedidos.fk_pedido = pedidos.id INNER JOIN categorias ON produtos.fk_categoria = categorias.id GROUP BY mes, mes_completo, produtos.nome, produtos.id, categorias.descricao ORDER BY mes, produtos.nome")

            }
            else {
                filtros = db.query("SELECT produtos.id, produtos.nome, DATE_PART('month', pedidos.data_cadastro) AS mes, to_char(pedidos.data_cadastro, 'TMMonth/YYYY') AS mes_completo, categorias.descricao, SUM(produtos_pedidos.qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.fk_produto = produtos.id INNER JOIN pedidos ON produtos_pedidos.fk_pedido = pedidos.id INNER JOIN categorias ON produtos.fk_categoria = categorias.id WHERE pedidos.data_cadastro between $1 and $2 GROUP BY mes, mes_completo, produtos.nome, produtos.id, categorias.descricao ORDER BY mes, produtos.nome", [
                    filtro.dataInicial,
                    filtro.dataFinal
                ]);
            }
            result = await filtros.then((dados) => {
                return (result = dados.rows.map((filtro) => {
                    return filtro;
                }));
            });
        }







        return result;

    }
}