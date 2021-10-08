import EntidadeDominio from "../entidade/entidade.model";
import IStrategy from "./IStrategy";
import Fachada from "../../control/Fachada";
import Cupom from "../entidade/cupom";

export default class ValidarCupom implements IStrategy {
    async processar(entidade: EntidadeDominio): Promise<string> {
        const cupom = entidade as Cupom;          
        let fachada = new Fachada();
        let msgn = "";
        
        let cupomEstoque = await fachada.consultar(cupom)
        
        cupomEstoque.forEach(cup => {
            let conversao = Object.assign(new Cupom(), cup);                      
            if (cupom.cod == conversao.cod)
            msgn= "Cupom já cadastrado";            
        });
        
        return msgn
    }
}
   

