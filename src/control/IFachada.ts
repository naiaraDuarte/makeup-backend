import EntidadeDominio from "../model/entidade/entidade.model";

export default interface IFachada {
    cadastrar(entidade: EntidadeDominio) : any;
    alterar(entidade: EntidadeDominio) : any;
    excluir(entidade: EntidadeDominio) : boolean;
    consultar(entidade: EntidadeDominio) : any;
}