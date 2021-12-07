import Fachada from "../../control/Fachada";
import { db } from "../../db.config";
import Cartao from "../entidade/cartao.model";
import Cliente from "../entidade/cliente.model";
import Cupom from "../entidade/cupom";
import Endereco from "../entidade/endereco";
import EntidadeDominio from "../entidade/entidadeDominio";
import Pagamento from "../entidade/pagamento";
import PagamentoCartao from "../entidade/pagamentoCartao";
import Pedido from "../entidade/pedido";
import Produto from "../entidade/produto";
import ProdutoPedido from "../entidade/produtoPedido";
import IDAO from "./IDAO";
import PagamentoCartaoDAO from "./PagamentoCartaoDAO";
import PagamentoDAO from "./PagamentoDAO";
import ProdutoPedidoDAO from "./ProdutoPedidoDAO";

export default class PedidoDAO implements IDAO {
    consultarPedido(entidade: EntidadeDominio, id: Number): Promise<EntidadeDominio[]> {
        throw new Error("Method not implemented.");
    }
    async salvar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
        const pedido = entidade as Pedido;

        // outras formas de pagamento
        let pagamentoDao = new PagamentoDAO();
        new Pagamento();
        let pagamento = await pagamentoDao.salvar(pedido.pagamento);
        let pgmtoCartaoDao = new PagamentoCartaoDAO();
        //salvando cada cartao que consta no pedido

        pedido.pagamento.cartoes.forEach(cart => {
            let pgmentoCartao = {
                cartao: cart,
                pagamento: pagamento
            }
            pgmtoCartaoDao.salvar(pgmentoCartao as PagamentoCartao);
        });
        let data = new Date()
        let idPedido = await db.query(
            "INSERT INTO pedidos (ped_cli_id, ped_end_id, ped_pgt_id, ped_valor, ped_frete, ped_status, ped_data_cadastro) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING ped_id",
            [
                pedido.cliente,
                pedido.endereco,
                pedido.pagamento.id,
                pedido.valor,
                pedido.frete,
                pedido.status,
                data

            ]

        );

        entidade.id = idPedido.rows[0].id;

        let produtoPedidoDao = new ProdutoPedidoDAO();
        new Produto();
        pedido.produtos.forEach(pdt => {
            let produtoPedido = {
                produto: pdt,
                pedido: pedido,
                status: pedido.status,
                qtdeComprada: pdt.quantidade
            }
            produtoPedidoDao.salvar(produtoPedido as ProdutoPedido);
        });

        entidade.id = idPedido.rows[0].id;

        return entidade as Pedido
    }


    async alterar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
        const pedido = entidade as Pedido;
        await db.query(
            "UPDATE pedidos SET ped_status=$1 WHERE ped_id=$2",
            [
                pedido.status,
                pedido.id
            ]
        );

        return entidade as Pedido;
    }
    inativar(entidade: EntidadeDominio): boolean {
        throw new Error("Method not implemented.");
    }
    async consultar(): Promise<EntidadeDominio[]> {
        let pedidos = db.query("SELECT* from pedidos ORDER BY ped_id");

        let result: any;
        let fachada = new Fachada();

        result = await pedidos.then((dados) => {
            return (result = dados.rows.map(async (pedido) => {
                let cliente = Object.assign(new Cliente());
                let endereco = Object.assign(new Endereco(), pedido.endereco);
                let pagamento = Object.assign(new Pagamento(), pedido.pagamento);
                let cupom = Object.assign(new Cupom());
                let cartao = Object.assign(new Cartao(), pedido.cartoes);
                let produto = Object.assign(new Produto(), pedido.produtos);
                pedido.cliente = await fachada.consultarPedido(cliente, pedido.ped_cli_id);
                pedido.endereco = await fachada.consultarPedido(endereco, pedido.ped_end_id);
                pedido.cupom = await fachada.consultarPedido(cupom, pedido.ped_id);
                pedido.cartoes = await fachada.consultarPedido(cartao, pedido.ped_id);
                pedido.produtos = await fachada.consultarPedido(produto, pedido.ped_id)
                return pedido as Pedido;
            }));
        });
        return result;
    }

    async consultarComId(entidade: EntidadeDominio): Promise<EntidadeDominio[]> {
        const cliente = entidade as Cliente;
        let pedidos = db.query("SELECT * FROM pedidos WHERE ped_cli_id = $1 ORDER BY ped_id", [
            cliente.id,
        ]);
        let result: any;
        let fachada = new Fachada();

        result = await pedidos.then((dados) => {
            return (result = dados.rows.map(async (pedido) => {
                let endereco = Object.assign(new Endereco(), pedido.endereco);
                let pagamento = Object.assign(new Pagamento(), pedido.pagamento);
                let cupom = Object.assign(new Cupom());
                let cartao = Object.assign(new Cartao(), pedido.cartoes);
                let produto = Object.assign(new Produto(), pedido.produtos);
                pedido.endereco = await fachada.consultarPedido(endereco, pedido.ped_end_id);
                pedido.cupom = await fachada.consultarPedido(cupom, pedido.ped_id);
                pedido.cartoes = await fachada.consultarPedido(cartao, pedido.ped_id);
                pedido.produtos = await fachada.consultarPedido(produto, pedido.ped_id)
                return pedido as Pedido;
            }));
        });


        return result
    }
}
