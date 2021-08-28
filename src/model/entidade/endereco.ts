import EntidadeDominio from "./entidade.model";
import { Estado } from "./estado";
import { Pais } from "./pais";
import { TipoEndereco } from "./tipoEndereco";
import { TipoLogradouro } from "./tipoLogradouro";
import { TipoResidencia } from "./tipoResidencia";

export default class Endereco extends EntidadeDominio {
    nome!: string;
    cep!: string;
    logradouro!: string;
    numero!: string;
    tipoEndereco!: TipoEndereco;
    tipoResidencia!: TipoResidencia;
    tipoLogradouro!: TipoLogradouro;
    bairro!: string;
    cidade!: string;
    uf!: Estado;
    pais!: Pais;
    complemento!: string;   
}