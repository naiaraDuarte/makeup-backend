interface CartaoCredito extends EntidadeDominio {
    nomeTitular: string;
    numero: string;
    cvv: string;
    dataValidade: Date;
}