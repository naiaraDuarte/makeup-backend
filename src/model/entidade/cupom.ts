import EntidadeDominio from "./entidadeDominio";

export default class Cupom extends EntidadeDominio{
    cod!: string;
    quant!:number;
    porcen!: number;
    tipo!:string;
}