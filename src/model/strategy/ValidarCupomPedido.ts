import EntidadeDominio from "../entidade/entidadeDominio";
import IStrategy from "./IStrategy";
import Pedido from "../entidade/pedido";
import CupomDAO from "../dao/CupomDAO";
import Fachada from "../../control/Fachada";
import Cupom from "../entidade/cupom";


export default class ValidarCupomPedido implements IStrategy {
    async processar(entidade: EntidadeDominio, altera: boolean): Promise<string> {
        const pedido = entidade as Pedido;
        let cupomDao = new CupomDAO();
        // let fachada = new Fachada();
        // let msgn = "";
        if (!altera) {
            let cupom= {
                id: pedido.pagamento.cupom.id,             
            }
            
            let alterarQtde = cupomDao.alterarQtde(cupom as Cupom);
        }
        return null!

    }
}
