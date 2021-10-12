import EntidadeDominio from "../model/entidade/entidadeDominio";

export default interface IFachada {
    cadastrar(entidade: EntidadeDominio) : any;
    alterar(entidade: EntidadeDominio) : any;
    excluir(entidade: EntidadeDominio) : boolean;
    consultar(entidade: EntidadeDominio) : any;
    consultarComId(entidade: EntidadeDominio) : any;
    consultarLogin(entidade: EntidadeDominio) : any;
}