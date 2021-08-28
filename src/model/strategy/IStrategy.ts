import EntidadeDominio from "../entidade/entidade.model";

export default interface IStrategy {
    processar(entidade: EntidadeDominio) : String;
}