import EntidadeDominio from "../entidade/entidade.model";
import Pedido from "../entidade/pedido";
import IStrategy from "./IStrategy";

export default class ValidarValorCartao implements IStrategy {
    async processar(entidade: EntidadeDominio): Promise<string> {
        const pedido = entidade as Pedido;
        const minimoCartao = 10;
        let msgn = "";


        if (pedido.pagamento.cashback != null || pedido.pagamento.cupom != null) {
            if (pedido.pagamento.cartoes.length > 1) {
                pedido.pagamento.cartoes.forEach(cart => {
                    let valorCartao = cart.credito;
                    if (valorCartao < minimoCartao) {
                        msgn = " Valor minimo no cartao de R$ 10,00"
                        return msgn
                    }
                });
            }
            // console.log("strategy", msgn)
            return msgn;
        }
        if (pedido.pagamento.cartoes.length > 1) {
            pedido.pagamento.cartoes.forEach(cart => {
                let valorCartao = cart.credito;
                console.log("valor cartao", valorCartao)
                if (valorCartao < minimoCartao) {
                    msgn = " Valor minimo no cartao de R$ 10,00"
                    return msgn
                }
            });
        }

        return msgn


    }
}
 // {
        //     if(pedido.pagamento.cartoes[0].credito < 10){
        //         return "Valor para pagamento no cartão acima de 10 reais"
        //     }
        // }