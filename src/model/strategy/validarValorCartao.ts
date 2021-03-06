import EntidadeDominio from "../entidade/entidadeDominio";
import Pedido from "../entidade/pedido";
import IStrategy from "./IStrategy";

export default class ValidarValorCartao implements IStrategy {
    async processar(entidade: EntidadeDominio, altera: boolean): Promise<string> {
        const pedido = entidade as Pedido;
        const minimoCartao = 10;
        let msgn = "";
        if (!altera) {
            if (pedido.pagamento.cashback != null || pedido.pagamento.cupom != null) {
                if (pedido.pagamento.cartoes.length > 1) {
                    pedido.pagamento.cartoes.forEach(cart => {
                        let valorCartao = cart.credito;
                        if (valorCartao < minimoCartao) {
                            msgn = " Valor minimo no cartao de R$ 10,00"
                            
                        }
                    });
                }
                
            }
            if (pedido.pagamento.cartoes.length > 1) {
                pedido.pagamento.cartoes.forEach(cart => {
                    let valorCartao = cart.credito;
                    if (valorCartao < minimoCartao) {
                        msgn =  " Valor minimo no cartao de R$ 10,00"
                        
                    }
                });
            }
        }
        if (msgn == "")
        return null!

        return msgn
    }
}
 // {
        //     if(pedido.pagamento.cartoes[0].credito < 10){
        //         return "Valor para pagamento no cartão acima de 10 reais"
        //     }
        // }