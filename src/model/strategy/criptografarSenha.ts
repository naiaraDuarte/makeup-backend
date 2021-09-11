import Cliente from "../entidade/cliente.model";
import entidadeModel from "../entidade/entidade.model";
import IStrategy from "./IStrategy";


export default class CriptografarSenha implements IStrategy{
    processar(entidade: entidadeModel): string {
        const cliente = entidade as Cliente;
        const crypto =require ('crypto');
        const alg = 'aes-256-ctr';
        const psw = 'abcdabcd';
        
        let senha = cliente.senha;
        const cipher = crypto.createCipher(alg, psw);
        const crypted = cipher.update(senha, 'utf-8', 'hex');
        cliente.senha = crypted;
        console.log("cliente", cliente.senha);
        return "";

    }
    // processarBD(entidade: entidadeModel): string {
    //     let cliente = entidade as Cliente;
    //     const crypto =require ('crypto');
    //     const alg = 'aes-256-ctr';
    //     const psw = 'abcdabcd';
        
    //     let senha = cliente.senha;
    //     const decipher = crypto.createDecipher(alg, psw);
    //     const crypted = decipher.update(senha,'hex', 'utf-8');
    //     cliente.senha = crypted;
    //     return "";

    // }





}