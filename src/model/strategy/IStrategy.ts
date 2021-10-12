import EntidadeDominio from "../entidade/entidadeDominio";

export default interface IStrategy {
    
    processar(entidade: EntidadeDominio, alterar: boolean) : Promise<string>;
}