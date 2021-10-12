import { BandeiraCartao } from "./bandeiraCartao";
import EntidadeDominio from "./entidadeDominio";

export default class Cartao extends EntidadeDominio {
    nome!: string;
    numero!: string;
    cvv!: string;
    data_validade!: string;
    bandeira!:BandeiraCartao;
    idCliente!: Number;
    credito!: number

   
}
