import Endereco from "./endereco";
import EntidadeDominio from "./entidade.model";
import { TipoTelefone } from "./tipoTelefone";

export default class Cliente extends EntidadeDominio {
    nome!: string;
    dataNasc!: Date;
    cpf!: string;
    tipoTelefone!: TipoTelefone;
    telefone!: string;
    sexo!: string;
    email!: string;
    senha!: string;
    endereco!: Array<Endereco>
}