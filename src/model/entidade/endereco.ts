interface Endereco extends EntidadeDominio {
    nome: string;
    cep: string;
    logradouro: string;
    numero: string;
    tipoEndereco: TipoEndereco;
    tipoResidencia: TipoResidencia;
    tipoLogradouro: TipoLogradouro;
    bairro: string;
    cidade: string;
    estado: string;
    pais: string;
    complemento: string;
       


}