import EntidadeDominio from "../entidade/entidade.model";
import IStrategy from "./IStrategy";

export default class ValidarEmail implements IStrategy {
    processar(entidade: EntidadeDominio): string {
        // const cartao = entidade as Cartao;

        return "";
    }

}