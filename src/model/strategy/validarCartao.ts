import Cartao from "../entidade/cartao.model";
import EntidadeDominio from "../entidade/entidade.model";
import IStrategy from "./IStrategy";

export default class ValidarCartao implements IStrategy {
    processar(entidade: EntidadeDominio): string {
        const cartao = entidade as Cartao;
        let numero = cartao.numero;        
        let validarCartao = require('validador-cartao-credito'); 
        
        if (numero.length == 16){               
            if(validarCartao(numero)){
                console.log("cartao valido");
                return ""
            }
        }      
        return "Numero do cartao invalido"

        
         
            // console.log("validar", validarCartao);
            // return "";
        
        return "Cartao invalido";
        
    }   

}