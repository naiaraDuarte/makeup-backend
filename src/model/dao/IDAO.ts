import EntidadeDominio  from "../entidade/entidadeDominio";

export default interface IDAO {
    salvar(entidade: EntidadeDominio) : Promise<EntidadeDominio>;
    alterar(entidade: EntidadeDominio) : Promise<EntidadeDominio>;
    inativar(entidade: EntidadeDominio) : boolean;
    consultar() : Promise<Array<EntidadeDominio>>;
    consultarComId(entidade: EntidadeDominio) : Promise<Array<EntidadeDominio>>;
    consultarPedido(entidade: EntidadeDominio, id: Number) : Promise<Array<EntidadeDominio>>;
}