import Endereco from "./endereco";
import EntidadeDominio from "./entidade.model";
import { Sexo } from "./sexo";
import { TipoTelefone } from "./tipoTelefone";

export default class Cliente extends EntidadeDominio {
    nome!: string;
    dataNasc!: Date;
    cpf!: string;
    tipoTelefone!: TipoTelefone;
    telefone!: string;
    sexo!: Sexo;
    email!: string;
    senha!: string;
    endereco!: Array<Endereco>
}