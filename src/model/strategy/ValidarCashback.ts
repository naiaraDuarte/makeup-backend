import EntidadeDominio from "../entidade/entidade.model";
import IStrategy from "./IStrategy";
import Pedido from "../entidade/pedido";
import CupomDAO from "../dao/CupomDAO";
import Fachada from "../../control/Fachada";
import Cupom from "../entidade/cupom";
import CashbackDAO from "../dao/CashbackDAO";
import Cashback from "../entidade/cashback";


export default class ValidarCashback implements IStrategy {
    async processar(entidade: EntidadeDominio): Promise<string> {
        const pedido = entidade as Pedido;
        let cashbackDao = new CashbackDAO();
        let fachada = new Fachada();
        let msgn = "";

        let cashback = {
            id: pedido.pagamento.cashback.id,
            valor: pedido.pagamento.cashback.valor
        }
        let alterarQtde = cashbackDao.alterarQtde(cashback as Cashback);

        return null!

    }
}