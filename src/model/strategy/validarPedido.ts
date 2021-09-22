import EntidadeDominio from "../entidade/entidade.model";
import Pedido from "../entidade/pedido";
import IStrategy from "./IStrategy";

export default class ValidarPedido implements IStrategy {
    processar(entidade: EntidadeDominio): string {
        const pedido = entidade as Pedido;
      
        

        return ""

        
    }
}