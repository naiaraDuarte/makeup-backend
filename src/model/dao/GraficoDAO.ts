import { db } from "../../db.config";
import EntidadeDominio from "../entidade/entidadeDominio";
import Filtro from "../entidade/filtro";
import Pedido from "../entidade/pedido";
import Produto from "../entidade/produto";
import IDAO from "./IDAO";


export default class FiltroDAO implements IDAO {
    salvar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
        throw new Error("Method not implemented.");
    }
    alterar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
        throw new Error("Method not implemented.");
    }
    inativar(entidade: EntidadeDominio): boolean {
        throw new Error("Method not implemented.");
    }
    async consultar(): Promise<EntidadeDominio[]> {
        let filtros = db.query("SELECT produtos.ped_id, produtos.ped_nome, DATE_PART('month', pedidos.ped_data_cadastro) AS mes, to_char(pedidos.ped_data_cadastro, 'TMMonth/YYYY') AS completo, categorias.cat_descricao, SUM(produtos_pedidos.ppd_qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.ppd_pdt_id = produtos.pdt_id INNER JOIN pedidos ON produtos_pedidos.ppd_ped_id = pedidos.ped_id INNER JOIN categorias ON produtos.pdt_cat_id = categorias.cat_id GROUP BY mes, completo, produtos.pdt_nome, produtos.pdt_id, categorias.cat_descricao ORDER BY mes, produtos.pdt_nome");
        let result: Array<EntidadeDominio> = [];

        result = await filtros.then((dados) => {
            return (result = dados.rows.map((filtro) => {

                return filtro as Filtro;
            }));
        });
       

        return result;

    }
    async consultarPedido(entidade: EntidadeDominio, id: Number): Promise<EntidadeDominio[]> {
        let result: Array<EntidadeDominio>;
            result = await this.graficoInicial(entidade, id);
        return result;
    }
    async graficoInicial(entidade: EntidadeDominio, id: Number): Promise<Array<EntidadeDominio>> {
        let filtros;
        if (id == 1) {
            filtros = db.query("SELECT DATE_PART('month', pedidos.ped_data_cadastro) AS mes, to_char(pedidos.ped_data_cadastro, 'TMMonth/YYYY') AS completo,  categorias.cat_descricao AS nome, categorias.cat_id, SUM(produtos_pedidos.ppd_qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.ppd_pdt_id = produtos.pdt_id INNER JOIN pedidos ON produtos_pedidos.ppd_ped_id = pedidos.ped_id INNER JOIN categorias ON produtos.pdt_cat_id = categorias.cat_id GROUP BY mes, completo, categorias.cat_id, categorias.cat_descricao ORDER BY mes, categorias.cat_descricao")
        }
        else {
            filtros = db.query("SELECT produtos.pdt_id, produtos.pdt_nome, DATE_PART('month', pedidos.ped_data_cadastro) AS mes, to_char(pedidos.ped_data_cadastro, 'TMMonth/YYYY') AS completo, categorias.cat_descricao, SUM(produtos_pedidos.ppd_qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.ppd_pdt_id = produtos.pdt_id INNER JOIN pedidos ON produtos_pedidos.ppd_ped_id = pedidos.ped_id INNER JOIN categorias ON produtos.pdt_cat_id = categorias.cat_id GROUP BY mes, completo, produtos.pdt_nome, produtos.pdt_id, categorias.cat_descricao ORDER BY mes, produtos.pdt_nome")
        }
        let result: Array<EntidadeDominio>;
        result = await filtros.then((dados) => {
            return (result = dados.rows.map((filtro) => {
                return filtro;
            }));
        });
        return result
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

    async grafico1(entidade: EntidadeDominio): Promise<Array<EntidadeDominio>> {
        const filtro = entidade as Filtro;
        let result: Array<EntidadeDominio>;
        let filtros: any;
        let cat = this.validaDatas(filtro.dataInicial, filtro.dataFinal)

        if (filtro.status == 1) {
            switch (cat) {
                case 1:
                    filtros = db.query("SELECT categorias.cat_id, categorias.cat_descricao AS nome, DATE_PART('day', pedidos.ped_data_cadastro) AS dia, to_char(pedidos.ped_data_cadastro, 'DD/TMMonth/YYYY') AS completo, SUM(produtos_pedidos.ppd_qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.ppd_pdt_id = produtos.pdt_id INNER JOIN pedidos ON produtos_pedidos.ppd_ped_id = pedidos.ped_id INNER JOIN categorias ON produtos.pdt_cat_id = categorias.cat_id WHERE pedidos.ped_data_cadastro between $1 and $2 GROUP BY dia, completo, categorias.cat_id, categorias.cat_descricao ORDER BY dia, categorias.cat_descricao", [
                        filtro.dataInicial,
                        filtro.dataFinal
                    ]);
                    break

                case 2:
                    filtros = db.query("SELECT DATE_PART('month', pedidos.ped_data_cadastro) AS mes, to_char(pedidos.ped_data_cadastro, 'TMMonth/YYYY') AS completo,  categorias.ccat_descricao AS nome, categorias.cat_id, SUM(produtos_pedidos.ppd_qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.ppd_pdt_id = produtos.pdt_id INNER JOIN pedidos ON produtos_pedidos.ppd_ped_id = pedidos.ped_id INNER JOIN categorias ON produtos.pdt_cat_id = categorias.cat_id WHERE pedidos.ped_data_cadastro between $1 and $2 GROUP BY mes, completo, categorias.cat_id, categorias.cat_descricao ORDER BY mes, categorias.cat_descricao", [
                        filtro.dataInicial,
                        filtro.dataFinal
                    ]);
                    break
                case 3:
                    filtros = db.query("SELECT categorias.cat_id, categorias.cat_descricao AS nome, DATE_PART('year', pedidos.ped_data_cadastro) AS completo, SUM(produtos_pedidos.ppd_qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.ppd_pdt_id = produtos.pdt_id INNER JOIN pedidos ON produtos_pedidos.ppd_ped_id = pedidos.ped_id INNER JOIN categorias ON produtos.pdt_cat_id = categorias.cat_id WHERE pedidos.ped_data_cadastro between $1 and $2 GROUP BY completo, categorias.cat_id, categorias.cat_descricao ORDER BY completo, categorias.cat_descricao", [
                        filtro.dataInicial,
                        filtro.dataFinal
                    ]);
            }
        } else {
            switch (cat) {
                case 1:
                    filtros = db.query("SELECT produtos.pdt_id, produtos.pdt_nome, DATE_PART('day', pedidos.ped_data_cadastro) AS dia, to_char(pedidos.ped_data_cadastro, 'DD/TMMonth/YYYY') AS completo, categorias.cat_descricao, SUM(produtos_pedidos.ppd_qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.ppd_pdt_id = produtos.pdt_id INNER JOIN pedidos ON produtos_pedidos.ppd_ped_id = pedidos.ped_id INNER JOIN categorias ON produtos.pdt_cat_id = categorias.cat_id WHERE pedidos.ped_data_cadastro between $1 and $2 GROUP BY dia, completo, produtos.pdt_nome, produtos.pdt_id, categorias.cat_descricao ORDER BY dia, produtos.pdt_nome", [
                        filtro.dataInicial,
                        filtro.dataFinal
                    ]);
                    break
                case 2:
                    filtros = db.query("SELECT produtos.pdt_id, produtos.pdt_nome, DATE_PART('month', pedidos.ped_data_cadastro) AS mes, to_char(pedidos.ped_data_cadastro, 'TMMonth/YYYY') AS completo, categorias.cat_descricao, SUM(produtos_pedidos.ppd_qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.ppd_pdt_id = produtos.pdt_id INNER JOIN pedidos ON produtos_pedidos.ppd_ped_id = pedidos.ped_id INNER JOIN categorias ON produtos.prod_cat_id = categorias.cat_id WHERE pedidos.ped_data_cadastro between $1 and $2 GROUP BY mes, completo, produtos.pdt_nome, produtos.pdt_id, categorias.cat_descricao ORDER BY mes, produtos.pdt_nome", [
                        filtro.dataInicial,
                        filtro.dataFinal
                    ]);
                    break
                case 3:
                    filtros = db.query("SELECT produtos.pdt_id, produtos.pdt_nome, DATE_PART('year', pedidos.ped_data_cadastro) AS completo, categorias.cat_descricao, SUM(produtos_pedidos.ppd_qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.ppd_pdt_id = produtos.pdt_id INNER JOIN pedidos ON produtos_pedidos.ppd_ped_id = pedidos.ped_id INNER JOIN categorias ON produtos.pdt_cat_id = categorias.cat_id WHERE pedidos.ped_data_cadastro between $1 and $2 GROUP BY completo, produtos.pdt_nome, produtos.pdt_id, categorias.cat_descricao ORDER BY completo, produtos.pdt_nome", [
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
                    filtros = db.query("SELECT categorias.cat_id, categorias.cat_descricao, DATE_PART('day', pedidos.ped_data_cadastro) AS dia, to_char(pedidos.ped_data_cadastro, 'DD/TMMonth/YYYY') AS dia_completo, produtos_pedidos.ppd_status, SUM(produtos_pedidos.ppd_qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.ppd_pdt_id = produtos.pdt_id INNER JOIN pedidos ON produtos_pedidos.ppd_ped_id = pedidos.ped_id INNER JOIN categorias ON produtos.pdt_cat_id = categorias.cat_id WHERE pedidos.ped_data_cadastro between $1 and $2 AND substring(produtos_pedidos.ppd_status, 1, 5) = $3 GROUP BY dia, dia_completo, categorias.cat_id, categorias.cat_descricao, produtos_pedidos.ppd_status ORDER BY dia, categorias.cat_descricao, produtos_pedidos.ppd_status", [
                        filtro.dataInicial,
                        filtro.dataFinal,
                        filtro.fluxo,
                    ]);
                    break

                case 2:
                    //Arrumada
                    filtros = db.query("SELECT produtos.pdt_id, produtos.pdt_nome, DATE_PART('month', pedidos.ped_data_cadastro) AS mes, to_char(pedidos.ped_data_cadastro, 'TMMonth/YYYY') AS mes_completo, categorias.cat_descricao, produtos_pedidos.ppd_status, SUM(produtos_pedidos.ppd_qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.ppd_pdt_id = produtos.pdt_id INNER JOIN pedidos ON produtos_pedidos.ppd_ped_id = pedidos.ped_id INNER JOIN categorias ON produtos.pdt_cat_id = categorias.cat_id WHERE pedidos.ped_data_cadastro between $1 and $2 AND substring(produtos_pedidos.ppd_status, 1, 5) = $3 GROUP BY mes, mes_completo, produtos.pdt_nome, produtos.pdt_id, categorias.cat_descricao, produtos_pedidos.ppd_status ORDER BY mes, produtos.pdt_nome, produtos_pedidos.ppd_status", [
                        filtro.dataInicial,
                        filtro.dataFinal, 
                        filtro.fluxo,
                    ]);
                    break
                case 3:
                    //Arrumada
                    filtros = db.query("SELECT categorias.cat_id, categorias.cat_descricao, DATE_PART('year', pedidos.ped_data_cadastro) AS ano, produtos_pedidos.ppd_status, SUM(produtos_pedidos.ppd_qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.ppd_pdt_id = produtos.pdt_id INNER JOIN pedidos ON produtos_pedidos.ppd_ped_id = pedidos.ped_id INNER JOIN categorias ON produtos.pdt_cat_id = categorias.cat_id WHERE pedidos.ped_data_cadastro between $1 and $2 AND substring(produtos_pedidos.ppd_status, 1, 5) = $3 GROUP BY ano, categorias.cat_id, categorias.cat_descricao, produtos_pedidos.ppd_status ORDER BY ano, categorias.cat_descricao, produtos_pedidos.ppd_status", [
                        filtro.dataInicial,
                        filtro.dataFinal,
                        filtro.fluxo,
                    ]);
            }
        } else {
            switch (cat) {
                case 1:
                    //FEITO
                    filtros = db.query("SELECT produtos.pdt_id, produtos.pdt_nome, DATE_PART('day', pedidos.ped_data_cadastro) AS dia, to_char(pedidos.ped_data_cadastro, 'DD/TMMonth/YYYY') AS dia_completo, categorias.cat_descricao, produtos_pedidos.ppd_status, SUM(produtos_pedidos.ppd_qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.ppd_pdt_id = produtos.pdt_id INNER JOIN pedidos ON produtos_pedidos.ppd_ped_id = pedidos.ped_id INNER JOIN categorias ON produtos.pdt_cat_id = categorias.cat_id WHERE pedidos.ped_data_cadastro between $1 and $2 AND substring(produtos_pedidos.ppd_status, 1, 5) = $3 GROUP BY dia, dia_completo, produtos.pdt_nome, produtos.pdt_id, categorias.cat_descricao, produtos_pedidos.ppd_status ORDER BY dia, produtos.pdt_nome, produtos_pedidos.ppd_status", [
                        filtro.dataInicial,
                        filtro.dataFinal,
                        filtro.fluxo,
                    ]);
                    break
                case 2:
                    //FEITO
                    filtros = db.query("SELECT produtos.pdt_id, produtos.pdt_nome, DATE_PART('month', pedidos.ped_data_cadastro) AS mes, to_char(pedidos.ped_data_cadastro, 'TMMonth/YYYY') AS mes_completo, categorias.cat_descricao, produtos_pedidos.ppd_status, SUM(produtos_pedidos.ppd_qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.ppd_pdt_id = produtos.pdt_id INNER JOIN pedidos ON produtos_pedidos.ppd_ped_id = pedidos.ped_id INNER JOIN categorias ON produtos.pdt_cat_id = categorias.cat_id WHERE pedidos.ped_data_cadastro between $1 and $2 AND substring(produtos_pedidos.ppd_status, 1, 5) = $3 GROUP BY mes, mes_completo, produtos.nome, produtos.pdt_id, categorias.cat_descricao, produtos_pedidos.ppd_status ORDER BY mes, produtos.pdt_nome, produtos_pedidos.ppd_status", [
                        filtro.dataInicial,
                        filtro.dataFinal,
                        filtro.fluxo,
                    ]);
                    break
                case 3:
                    //FEITO
                    filtros = db.query("SELECT produtos.pdt_id, produtos.pdt_nome, produtos_pedidos.ppd_status, DATE_PART('year', pedidos.ped_data_cadastro) AS ano, categorias.cat_descricao, SUM(produtos_pedidos.ppd_qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.ppd_pdt_id = produtos.pdt_id INNER JOIN pedidos ON produtos_pedidos.ppd_ped_id = pedidos.ped_id INNER JOIN categorias ON produtos.pdt_cat_id = categorias.cat_id WHERE pedidos.ped_data_cadastro between $1 and $2 AND substring(produtos_pedidos.ppd_status, 1, 5) = $3 GROUP BY ano, produtos.pdt_nome, produtos.pdt_id, categorias.cat_descricao, produtos_pedidos.ppd_status ORDER BY ano, produtos.pdt_nome, produtos_pedidos.ppd_status", [
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
    
    async consultaCliente(entidade: EntidadeDominio): Promise<Array<EntidadeDominio>> {
        let pedidos = db.query("SELECT COUNT(*) as Compras, cli_nome, CLIENTES.cli_id from CLIENTES inner join pedidos on CLIENTES.cli_id = ped_cli_id group by CLIENTES.cli_id order by Compras desc")
        let result: any;        

    result = await pedidos.then((dados) => {
        return (result = dados.rows.map((pedido) => {
            return pedido as Pedido;
        }));
    });    
    return result
    }

    validaDatas(dataI: Date, dataF: Date) {
       
        if (dataI.getFullYear() == dataF.getFullYear() && dataI.getUTCMonth() == dataF.getUTCMonth()) {
            //pegar dias 
           
            return 1;
        } else if (dataI.getFullYear() == dataF.getFullYear() && dataI.getUTCMonth() != dataF.getUTCMonth()) {
            //pegar mês
           
            return 2;
        } else {
           
            //pegar ano
            return 3
        }
    }

    async consultarMarcadores(entidade: EntidadeDominio): Promise<Array<EntidadeDominio>> {
        const filtro = entidade as Filtro;
        let produtos;
        let todos;
        let menos;
        let pedidos;

        ///parei aqui kkkkkkkkkkkkkkk
        if (filtro.dataInicial == null) {
            todos = db.query('SELECT COUNT(*) as Produtos from produtos_pedidos');
            produtos = db.query("SELECT COUNT(*) as Produtos, pdt_nome from produtos_pedidos inner join produtos on produtos_pedidos.fk_produto = produtos.id group by produtos.id order by Produtos desc LIMIT 1")
            menos = db.query("SELECT COUNT(*) as Produtos, nome from produtos_pedidos inner join produtos on produtos_pedidos.fk_produto = produtos.id group by produtos.id order by Produtos asc LIMIT 1")
            pedidos = db.query("SELECT COUNT(*) as Produtos from pedidos");
        }else{
            todos = db.query('SELECT COUNT(*) as Produtos from produtos_pedidos INNER JOIN pedidos ON produtos_pedidos.fk_pedido = pedidos.id WHERE pedidos.data_cadastro between $1 and $2', [
                filtro.dataInicial,
                filtro.dataFinal
            ]);
            produtos = db.query("SELECT COUNT(*) as Produtos, nome from produtos_pedidos inner join produtos on produtos_pedidos.fk_produto = produtos.id INNER JOIN pedidos ON produtos_pedidos.fk_pedido = pedidos.id WHERE pedidos.data_cadastro between $1 and $2 group by produtos.id order by Produtos desc LIMIT 1", [
                filtro.dataInicial,
                filtro.dataFinal
            ]);
            menos = db.query("SELECT COUNT(*) as Produtos, nome from produtos_pedidos inner join produtos on produtos_pedidos.fk_produto = produtos.id INNER JOIN pedidos ON produtos_pedidos.fk_pedido = pedidos.id WHERE pedidos.data_cadastro between $1 and $2 group by produtos.id order by Produtos asc LIMIT 1", [
                filtro.dataInicial,
                filtro.dataFinal
            ])
            pedidos = db.query("SELECT COUNT(*) as Produtos from pedidos WHERE pedidos.data_cadastro between $1 and $2",[
                filtro.dataInicial,
                filtro.dataFinal
            ]);
        }
        
        let result: any; 
        let resultTodos: any;
        let resultMenos: any; 
        let resultPedidos: any;
        let final: any = {};      
        
        result = await produtos.then((dados) => {
            return (result = dados.rows.map((produto) => {
                return produto as Produto;
            }));
        });    
        resultTodos = await todos.then((dados) => {
            return (resultTodos = dados.rows.map((produto) => {
                return produto;
            }));
        });
        resultMenos = await menos.then((dados) => {
            return (resultMenos = dados.rows.map((produto) => {
                return produto;
            }));
        });
        resultPedidos = await pedidos.then((dados) => {
            return (resultPedidos = dados.rows.map((produto) => {
                return produto;
            }));
        });

        final = {
            total: resultTodos[0],
            mais: result[0],
            menos: resultMenos[0],
            pedidos: resultPedidos[0]
        }

        return final;
    }

    async graficoEmPizza(entidade: EntidadeDominio): Promise<Array<EntidadeDominio>> {
        const filtro = entidade as Filtro;
        let troca;
        let cancelamento;
        if (filtro.dataInicial == null) {
            troca = db.query('SELECT produtos_pedidos.status, SUM(produtos_pedidos.qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.fk_produto = produtos.id INNER JOIN pedidos ON produtos_pedidos.fk_pedido = pedidos.id INNER JOIN categorias ON produtos.fk_categoria = categorias.id WHERE substring(produtos_pedidos.status, 1, 5) = $1 GROUP BY produtos_pedidos.status ORDER BY produtos_pedidos.status', [
                'TROCA'
            ]);
            cancelamento =  db.query('SELECT produtos_pedidos.status, SUM(produtos_pedidos.qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.fk_produto = produtos.id INNER JOIN pedidos ON produtos_pedidos.fk_pedido = pedidos.id INNER JOIN categorias ON produtos.fk_categoria = categorias.id WHERE substring(produtos_pedidos.status, 1, 5) = $1 GROUP BY produtos_pedidos.status ORDER BY produtos_pedidos.status', [
                'CANCE'
            ]);
        }else{
            troca = db.query('SELECT produtos_pedidos.status, SUM(produtos_pedidos.qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.fk_produto = produtos.id INNER JOIN pedidos ON produtos_pedidos.fk_pedido = pedidos.id INNER JOIN categorias ON produtos.fk_categoria = categorias.id WHERE pedidos.data_cadastro between $1 and $2 AND substring(produtos_pedidos.status, 1, 5) = $3 GROUP BY produtos_pedidos.status ORDER BY produtos_pedidos.status', [
                filtro.dataInicial,
                filtro.dataFinal,
                'TROCA'
            ]);
            cancelamento = db.query("SELECT produtos_pedidos.status, SUM(produtos_pedidos.qtde_comprada) AS total FROM produtos_pedidos INNER JOIN produtos ON produtos_pedidos.fk_produto = produtos.id INNER JOIN pedidos ON produtos_pedidos.fk_pedido = pedidos.id INNER JOIN categorias ON produtos.fk_categoria = categorias.id WHERE pedidos.data_cadastro between $1 and $2 AND substring(produtos_pedidos.status, 1, 5) = $3 GROUP BY produtos_pedidos.status ORDER BY produtos_pedidos.status", [
                filtro.dataInicial,
                filtro.dataFinal,
                'CANCE'
            ]);
        }
        
        let result: any; 
        let resultCancelamento: any;  
        let final: any = {};

        resultCancelamento = await cancelamento.then((dados) => {
            return (result = dados.rows.map((pedido) => {
                return pedido;
            }));
        });
        result = await troca.then((dados) => {
            return (result = dados.rows.map((pedido) => {
                return pedido as Pedido;
            }));
        });    
        
        final.troca = result;
        final.cancelamento = resultCancelamento
        return final;
    }

}

