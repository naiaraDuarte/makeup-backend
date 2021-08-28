import EntidadeDominio from "./entidade.model";

export default class Cliente extends EntidadeDominio {
    nome!: string;
    dataNasc!: Date;
    cpf!: string;
    tipoTelefone!: string;
    telefone!: string;
    sexo!: string;
    email!: string;
    senha!: string;

    // constructor(nome, dataNasc, cpf, tipoTelefone, telefone, sexo, email, senha){
        
    // }
}