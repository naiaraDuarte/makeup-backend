import EntidadeDominio from "./entidadeDominio";

export default class Filtro extends EntidadeDominio {
    dataInicial!: Date;
    dataFinal!: Date;
    status!: number;
    fluxo!: string
}
