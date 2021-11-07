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
        let filtros = db.query("SELECT produtos.id, produtos.nome, DATE_PART('month', pedidos.data_cadastro) AS mes, to_char(pedidos.data_cadastro, 'TMMonth/YYYY') AS completo, categorias.descricao, SUM(produtos_pedidos.qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.fk_produto = produtos.id INNER JOIN pedidos ON produtos_pedidos.fk_pedido = pedidos.id INNER JOIN categorias ON produtos.fk_categoria = categorias.id GROUP BY mes, completo, produtos.nome, produtos.id, categorias.descricao ORDER BY mes, produtos.nome");
        let result: Array<EntidadeDominio> = [];

        result = await filtros.then((dados) => {
            return (result = dados.rows.map((filtro) => {

                return filtro as Filtro;
            }));
        });
        console.log("result", result)

        return result;

    }
    async consultarPedido(entidade: EntidadeDominio, id: Number): Promise<EntidadeDominio[]> {
        const filtro = entidade as Filtro;
        let result: Array<EntidadeDominio>;
        if (filtro.fluxo == null) {
            result = await this.grafico1Inicial(entidade, id)
        }else{
            result = await this.grafico1Inicial(entidade, id)
        }

        return result;
    }

    async consultarComId(entidade: EntidadeDominio): Promise<Array<EntidadeDominio>> {
        const filtro = entidade as Filtro;
        let result: Array<EntidadeDominio>;
        if (filtro.fluxo == null) {
            result = await this.grafico1(entidade)
        }else{
            result = await this.grafico1(entidade)
        }

        return result;
    }

    async grafico1Inicial(entidade: EntidadeDominio, id: Number): Promise<Array<EntidadeDominio>> {
        let filtros;
        if (id == 1) {
            filtros = db.query("SELECT DATE_PART('month', pedidos.data_cadastro) AS mes, to_char(pedidos.data_cadastro, 'TMMonth/YYYY') AS completo,  categorias.descricao AS nome, categorias.id, SUM(produtos_pedidos.qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.fk_produto = produtos.id INNER JOIN pedidos ON produtos_pedidos.fk_pedido = pedidos.id INNER JOIN categorias ON produtos.fk_categoria = categorias.id GROUP BY mes, completo, categorias.id, categorias.descricao ORDER BY mes, categorias.descricao")
        }
        else {
            filtros = db.query("SELECT produtos.id, produtos.nome, DATE_PART('month', pedidos.data_cadastro) AS mes, to_char(pedidos.data_cadastro, 'TMMonth/YYYY') AS completo, categorias.descricao, SUM(produtos_pedidos.qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.fk_produto = produtos.id INNER JOIN pedidos ON produtos_pedidos.fk_pedido = pedidos.id INNER JOIN categorias ON produtos.fk_categoria = categorias.id GROUP BY mes, completo, produtos.nome, produtos.id, categorias.descricao ORDER BY mes, produtos.nome")
        }
        let result: Array<EntidadeDominio>;
        result = await filtros.then((dados) => {
            return (result = dados.rows.map((filtro) => {
                return filtro;
            }));
        });
        return result
    }

    async grafico2Inicial(entidade: EntidadeDominio,  id: Number): Promise<Array<EntidadeDominio>> {
        let filtros;
        if (id == 1) {
            filtros = db.query("SELECT produtos.id, produtos.nome, DATE_PART('month', pedidos.data_cadastro) AS mes, to_char(pedidos.data_cadastro, 'TMMonth/YYYY') AS mes_completo, categorias.descricao, produtos_pedidos.status, SUM(produtos_pedidos.qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.fk_produto = produtos.id INNER JOIN pedidos ON produtos_pedidos.fk_pedido = pedidos.id INNER JOIN categorias ON produtos.fk_categoria = categorias.id GROUP BY mes, mes_completo, produtos.nome, produtos.id, categorias.descricao, produtos_pedidos.status ORDER BY mes, produtos.nome, produtos_pedidos.status")
        }
        else {
            filtros = db.query("SELECT produtos.id, produtos.nome, DATE_PART('month', pedidos.data_cadastro) AS mes, to_char(pedidos.data_cadastro, 'TMMonth/YYYY') AS mes_completo, categorias.descricao, produtos_pedidos.status, SUM(produtos_pedidos.qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.fk_produto = produtos.id INNER JOIN pedidos ON produtos_pedidos.fk_pedido = pedidos.id INNER JOIN categorias ON produtos.fk_categoria = categorias.id GROUP BY mes, mes_completo, produtos.nome, produtos.id, categorias.descricao, produtos_pedidos.status ORDER BY mes, produtos.nome, produtos_pedidos.status")
        }
        let result: Array<EntidadeDominio>;
        result = await filtros.then((dados) => {
            return (result = dados.rows.map((filtro) => {
                return filtro;
            }));
        });
        return result
    }

    async grafico1(entidade: EntidadeDominio): Promise<Array<EntidadeDominio>> {
        const filtro = entidade as Filtro;
        let result: Array<EntidadeDominio>;
        let filtros: any;
        let cat = this.validaDatas(filtro.dataInicial, filtro.dataFinal)

        if (filtro.status == 1) {
            switch (cat) {
                case 1:
                    filtros = db.query("SELECT categorias.id, categorias.descricao, DATE_PART('day', pedidos.data_cadastro) AS dia, to_char(pedidos.data_cadastro, 'DD/TMMonth/YYYY') AS completo, SUM(produtos_pedidos.qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.fk_produto = produtos.id INNER JOIN pedidos ON produtos_pedidos.fk_pedido = pedidos.id INNER JOIN categorias ON produtos.fk_categoria = categorias.id WHERE pedidos.data_cadastro between $1 and $2 GROUP BY dia, completo, categorias.id, categorias.descricao ORDER BY dia, categorias.descricao", [
                        filtro.dataInicial,
                        filtro.dataFinal
                    ]);
                    break

                case 2:
                    filtros = db.query("SELECT DATE_PART('month', pedidos.data_cadastro) AS mes, to_char(pedidos.data_cadastro, 'TMMonth/YYYY') AS completo,  categorias.descricao AS nome, categorias.id, SUM(produtos_pedidos.qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.fk_produto = produtos.id INNER JOIN pedidos ON produtos_pedidos.fk_pedido = pedidos.id INNER JOIN categorias ON produtos.fk_categoria = categorias.id WHERE pedidos.data_cadastro between $1 and $2 GROUP BY mes, completo, categorias.id, categorias.descricao ORDER BY mes, categorias.descricao", [
                        filtro.dataInicial,
                        filtro.dataFinal
                    ]);
                    break
                case 3:
                    filtros = db.query("SELECT categorias.id, categorias.descricao, DATE_PART('year', pedidos.data_cadastro) AS completo, SUM(produtos_pedidos.qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.fk_produto = produtos.id INNER JOIN pedidos ON produtos_pedidos.fk_pedido = pedidos.id INNER JOIN categorias ON produtos.fk_categoria = categorias.id WHERE pedidos.data_cadastro between $1 and $2 GROUP BY completo, categorias.id, categorias.descricao ORDER BY completo, categorias.descricao", [
                        filtro.dataInicial,
                        filtro.dataFinal
                    ]);
            }
        } else {
            switch (cat) {
                case 1:
                    filtros = db.query("SELECT produtos.id, produtos.nome, DATE_PART('day', pedidos.data_cadastro) AS dia, to_char(pedidos.data_cadastro, 'DD/TMMonth/YYYY') AS completo, categorias.descricao, SUM(produtos_pedidos.qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.fk_produto = produtos.id INNER JOIN pedidos ON produtos_pedidos.fk_pedido = pedidos.id INNER JOIN categorias ON produtos.fk_categoria = categorias.id WHERE pedidos.data_cadastro between $1 and $2 GROUP BY dia, completo, produtos.nome, produtos.id, categorias.descricao ORDER BY dia, produtos.nome", [
                        filtro.dataInicial,
                        filtro.dataFinal
                    ]);
                    break
                case 2:
                    filtros = db.query("SELECT produtos.id, produtos.nome, DATE_PART('month', pedidos.data_cadastro) AS mes, to_char(pedidos.data_cadastro, 'TMMonth/YYYY') AS completo, categorias.descricao, SUM(produtos_pedidos.qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.fk_produto = produtos.id INNER JOIN pedidos ON produtos_pedidos.fk_pedido = pedidos.id INNER JOIN categorias ON produtos.fk_categoria = categorias.id WHERE pedidos.data_cadastro between $1 and $2 GROUP BY mes, completo, produtos.nome, produtos.id, categorias.descricao ORDER BY mes, produtos.nome", [
                        filtro.dataInicial,
                        filtro.dataFinal
                    ]);
                    break
                case 3:
                    filtros = db.query("SELECT produtos.id, produtos.nome, DATE_PART('year', pedidos.data_cadastro) AS completo, categorias.descricao, SUM(produtos_pedidos.qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.fk_produto = produtos.id INNER JOIN pedidos ON produtos_pedidos.fk_pedido = pedidos.id INNER JOIN categorias ON produtos.fk_categoria = categorias.id WHERE pedidos.data_cadastro between $1 and $2 GROUP BY completo, produtos.nome, produtos.id, categorias.descricao ORDER BY completo, produtos.nome", [
                        filtro.dataInicial,
                        filtro.dataFinal
                    ]);
                    break
            }
        }

        result = await filtros.then((dados: { rows: any[]; }) => {
            return (result = dados.rows.map((filtro) => {
                return filtro;
            }));
        });

        return result;
    }

    async grafico2(entidade: EntidadeDominio): Promise<Array<EntidadeDominio>> {
        const filtro = entidade as Filtro;
        let result: Array<EntidadeDominio>;
        let filtros: any;
        let cat = this.validaDatas(filtro.dataInicial, filtro.dataFinal)

        if (filtro.status == 1) {
            switch (cat) {
                case 1:
                    //Arrumada
                    filtros = db.query("SELECT categorias.id, categorias.descricao, DATE_PART('day', pedidos.data_cadastro) AS dia, to_char(pedidos.data_cadastro, 'DD/TMMonth/YYYY') AS dia_completo, produtos_pedidos.status, SUM(produtos_pedidos.qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.fk_produto = produtos.id INNER JOIN pedidos ON produtos_pedidos.fk_pedido = pedidos.id INNER JOIN categorias ON produtos.fk_categoria = categorias.id WHERE pedidos.data_cadastro between $1 and $2 AND substring(produtos_pedidos.status, 1, 5) = $3 GROUP BY dia, dia_completo, categorias.id, categorias.descricao, produtos_pedidos.status ORDER BY dia, categorias.descricao, produtos_pedidos.status", [
                        filtro.dataInicial,
                        filtro.dataFinal,
                        filtro.fluxo,
                    ]);
                    break

                case 2:
                    //Arrumada
                    filtros = db.query("SELECT produtos.id, produtos.nome, DATE_PART('month', pedidos.data_cadastro) AS mes, to_char(pedidos.data_cadastro, 'TMMonth/YYYY') AS mes_completo, categorias.descricao, produtos_pedidos.status, SUM(produtos_pedidos.qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.fk_produto = produtos.id INNER JOIN pedidos ON produtos_pedidos.fk_pedido = pedidos.id INNER JOIN categorias ON produtos.fk_categoria = categorias.id WHERE pedidos.data_cadastro between $1 and $2 AND substring(produtos_pedidos.status, 1, 5) = $3 GROUP BY mes, mes_completo, produtos.nome, produtos.id, categorias.descricao, produtos_pedidos.status ORDER BY mes, produtos.nome, produtos_pedidos.status", [
                        filtro.dataInicial,
                        filtro.dataFinal, 
                        filtro.fluxo,
                    ]);
                    break
                case 3:
                    //Arrumada
                    filtros = db.query("SELECT categorias.id, categorias.descricao, DATE_PART('year', pedidos.data_cadastro) AS ano, produtos_pedidos.status, SUM(produtos_pedidos.qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.fk_produto = produtos.id INNER JOIN pedidos ON produtos_pedidos.fk_pedido = pedidos.id INNER JOIN categorias ON produtos.fk_categoria = categorias.id WHERE pedidos.data_cadastro between $1 and $2 AND substring(produtos_pedidos.status, 1, 5) = $3 GROUP BY ano, categorias.id, categorias.descricao, produtos_pedidos.status ORDER BY ano, categorias.descricao, produtos_pedidos.status", [
                        filtro.dataInicial,
                        filtro.dataFinal,
                        filtro.fluxo,
                    ]);
            }
        } else {
            switch (cat) {
                case 1:
                    //FEITO
                    filtros = db.query("SELECT produtos.id, produtos.nome, DATE_PART('day', pedidos.data_cadastro) AS dia, to_char(pedidos.data_cadastro, 'DD/TMMonth/YYYY') AS dia_completo, categorias.descricao, produtos_pedidos.status, SUM(produtos_pedidos.qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.fk_produto = produtos.id INNER JOIN pedidos ON produtos_pedidos.fk_pedido = pedidos.id INNER JOIN categorias ON produtos.fk_categoria = categorias.id WHERE pedidos.data_cadastro between $1 and $2 AND substring(produtos_pedidos.status, 1, 5) = $3 GROUP BY dia, dia_completo, produtos.nome, produtos.id, categorias.descricao, produtos_pedidos.status ORDER BY dia, produtos.nome, produtos_pedidos.status", [
                        filtro.dataInicial,
                        filtro.dataFinal,
                        filtro.fluxo,
                    ]);
                    break
                case 2:
                    //FEITO
                    filtros = db.query("SELECT produtos.id, produtos.nome, DATE_PART('month', pedidos.data_cadastro) AS mes, to_char(pedidos.data_cadastro, 'TMMonth/YYYY') AS mes_completo, categorias.descricao, produtos_pedidos.status, SUM(produtos_pedidos.qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.fk_produto = produtos.id INNER JOIN pedidos ON produtos_pedidos.fk_pedido = pedidos.id INNER JOIN categorias ON produtos.fk_categoria = categorias.id WHERE pedidos.data_cadastro between $1 and $2 AND substring(produtos_pedidos.status, 1, 5) = $3 GROUP BY mes, mes_completo, produtos.nome, produtos.id, categorias.descricao, produtos_pedidos.status ORDER BY mes, produtos.nome, produtos_pedidos.status", [
                        filtro.dataInicial,
                        filtro.dataFinal,
                        filtro.fluxo,
                    ]);
                    break
                case 3:
                    //FEITO
                    filtros = db.query("SELECT produtos.id, produtos.nome, produtos_pedidos.status, DATE_PART('year', pedidos.data_cadastro) AS ano, categorias.descricao, SUM(produtos_pedidos.qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.fk_produto = produtos.id INNER JOIN pedidos ON produtos_pedidos.fk_pedido = pedidos.id INNER JOIN categorias ON produtos.fk_categoria = categorias.id WHERE pedidos.data_cadastro between $1 and $2 AND substring(produtos_pedidos.status, 1, 5) = $3 GROUP BY ano, produtos.nome, produtos.id, categorias.descricao, produtos_pedidos.status ORDER BY ano, produtos.nome, produtos_pedidos.status", [
                        filtro.dataInicial,
                        filtro.dataFinal,
                        filtro.fluxo,
                    ]);
                    break
            }
        }

        result = await filtros.then((dados: { rows: any[]; }) => {
            return (result = dados.rows.map((filtro) => {
                return filtro;
            }));
        });

        return result;
    }

    validaDatas(dataI: Date, dataF: Date) {
        console.log("i", dataI.getMonth(), "F", dataF.getMonth(), 'data I', dataI, 'data F', dataF)
        if (dataI.getFullYear() == dataF.getFullYear() && dataI.getUTCMonth() == dataF.getUTCMonth()) {
            //pegar dias 
            console.log("pegar dias ")
            return 1;
        } else if (dataI.getFullYear() == dataF.getFullYear() && dataI.getUTCMonth() != dataF.getUTCMonth()) {
            //pegar mês
            console.log("pegar mês ")
            return 2;
        } else {
            console.log("pegar ano ")
            //pegar ano
            return 3
        }
    }
}

