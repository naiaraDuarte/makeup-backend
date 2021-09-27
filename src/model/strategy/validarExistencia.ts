import ClienteDAO from "../dao/ClienteDAO";
import Cliente from "../entidade/cliente.model";
import EntidadeDominio from "../entidade/entidade.model";
import IStrategy from "./IStrategy";

export default class ValidarExistencia implements IStrategy {
    async processar(entidade: EntidadeDominio): Promise<string> {    
        const cliente = entidade as Cliente                      
                  
                let dao = new ClienteDAO();
                let ent = await dao.consultarCpf(cliente);
                console.log("entidade", ent);
                // if()      

                                  
                
                
                return ""    
}   
}
                
                       
    
        
    
    
