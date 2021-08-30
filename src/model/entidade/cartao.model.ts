import { BandeiraCartao } from "./bandeiraCartao";
import EntidadeDominio from "./entidade.model";

export default class Cartao extends EntidadeDominio {
    nome!: string;
    numero!: string;
    cvv!: string;
    data_validade!: Date;
    bandeira!:BandeiraCartao;
    idCliente!: Number

   
}
