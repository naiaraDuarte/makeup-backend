import Fachada from "../../control/Fachada";
import ClienteDAO from "../dao/ClienteDAO";
import Cliente from "../entidade/cliente.model";
import EntidadeDominio from "../entidade/entidade.model";
import IStrategy from "./IStrategy";

export default class ValidarExistencia implements IStrategy {
    async processar(entidade: EntidadeDominio, altera: boolean): Promise<string> {    
        const cliente = entidade as Cliente;          
        let fachada = new Fachada();
        let msgn = "";
        
        let clienteCpf = await fachada.consultar(cliente)
        
        clienteCpf.forEach(cli => {
            let conversao = Object.assign(new Cliente(), cli);                                
            if (cliente.cpf == conversao.cpf && !altera)
            msgn= "Cliente já cadastrado";            
        });
        if (msgn == "")
        return null!

        return msgn   
}   
}
                
                       
    
        
    
    
