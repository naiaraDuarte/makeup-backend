import express from "express";
import Fachada from "../control/Fachada";
import { BandeiraCartao } from "../model/entidade/bandeiraCartao";
import Cartao from "../model/entidade/cartao.model";

export const CartaoRouter = express.Router();

let fachada = new Fachada();

CartaoRouter.get("/", async (req, res) => {
    res.json({ message: "OK" })
}); 

CartaoRouter.post("/:id", async (req, res) => {
    let cartao = req.body;
    const cartaoCredito = {
        idCliente: parseInt(req.params.id),
        nome: cartao.nome,
        numero: cartao.numero,
        cvv: cartao.cvv,
        data_validade: cartao.data_validade.trim(),
        bandeira: BandeiraCartao[cartao.bandeira]
    };
    let conversao = Object.assign(new Cartao(), cartaoCredito);
    let listaCartao: any = await fachada.cadastrar(conversao as Cartao);
    res.json({ message: "OK", cartao: listaCartao });
});

CartaoRouter.put("/:id", async (req, res) => {
    let cartao = req.body;
    const cartaoCredito = {
        id: parseInt(req.params.id),
        nome: cartao.nome,
        numero: cartao.numero,
        cvv: cartao.cvv,
        data_validade: cartao.data_validade,
        bandeira: BandeiraCartao[cartao.bandeira],
        
    };

    let conversao = Object.assign(new Cartao(), cartaoCredito);
    let listaCliente: any = await fachada.alterar(conversao as Cartao);
    res.json({ message: "OK", dados: listaCliente });
});

CartaoRouter.delete("/:id", async (req, res) => {
    const cartaoCredito = {
        id: req.params.id,
    };
    let conversao = Object.assign(new Cartao(), cartaoCredito);;
    let listaCliente: boolean = await fachada.excluir(conversao as Cartao);

    res.json({ message: "OK", dados: listaCliente });
});
