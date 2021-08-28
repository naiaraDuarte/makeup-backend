import EntidadeDominio  from "../entidade/entidade.model";

export default interface IDAO {
    salvar(entidade: EntidadeDominio) : Promise<EntidadeDominio>;
    alterar(entidade: EntidadeDominio) : Promise<EntidadeDominio>;
    excluir(entidade: EntidadeDominio) : boolean;
    consultar() : Promise<Array<EntidadeDominio>>;
    consultar2(entidade: EntidadeDominio) : Promise<EntidadeDominio>;

}