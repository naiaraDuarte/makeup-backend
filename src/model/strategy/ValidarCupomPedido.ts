import EntidadeDominio from "../entidade/entidade.model";
import IStrategy from "./IStrategy";
import Pedido from "../entidade/pedido";
import CupomDAO from "../dao/CupomDAO";
import Fachada from "../../control/Fachada";
import Cupom from "../entidade/cupom";


export default class ValidarCupomPedido implements IStrategy {
    async processar(entidade: EntidadeDominio): Promise<string> {
        const pedido = entidade as Pedido;
        let cupomDao = new CupomDAO();
        let fachada = new Fachada();
        let msgn = "";
        
        let cupom= {
            id: pedido.pagamento.cupom.id,
             
        }
        
        let alterarQtde = cupomDao.alterarQtde(cupom as Cupom);

        return msgn

    }
}
