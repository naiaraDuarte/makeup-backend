import EntidadeDominio from "./entidade.model";

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
    estado!: Estado;
    pais!: Pais;
    complemento!: string;   


}