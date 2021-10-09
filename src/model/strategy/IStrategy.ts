import EntidadeDominio from "../entidade/entidade.model";

export default interface IStrategy {
    
    processar(entidade: EntidadeDominio, alterar: boolean) : Promise<string>;
}