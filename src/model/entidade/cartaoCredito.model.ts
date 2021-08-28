import EntidadeDominio from "./entidade.model";

export default class CartaoCredito extends EntidadeDominio {
    nomeTitular!: string;
    numero!: string;
    cvv!: string;
    dataValidade!: Date;
    bandeira!:BandeiraCartao;

   
}
