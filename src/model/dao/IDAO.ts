import EntidadeDominio  from "../entidade/entidade.model";

export default interface IDAO {
    salvar(entidade: EntidadeDominio) : Promise<EntidadeDominio>;
    alterar(entidade: EntidadeDominio) : Promise<EntidadeDominio>;
    excluir(entidade: EntidadeDominio) : boolean;
    consultar() : Promise<Array<EntidadeDominio>>;
    consultarComId(entidade: EntidadeDominio) : Promise<Array<EntidadeDominio>>;
    consultarPedido(entidade: EntidadeDominio, id: Number) : Promise<Array<EntidadeDominio>>;
}