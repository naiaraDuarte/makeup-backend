import IDAO from './IDAO';
import EntidadeDominio from '../entidade/entidade.model';
import { db } from '../../db.config';
import Endereco from '../entidade/endereco';

export default class EnderecoDAO implements IDAO {
    async salvar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
        const endereco = entidade as Endereco;
        let idEndereco = await db.query('INSERT INTO enderecos(nome, cep, logradouro, numero, complemento, bairro, cidade, uf, pais, tipo_residencia, tipo_logradouro, tipo_endereco) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id', [endereco.nome, endereco.cep, endereco.logradouro, endereco.numero, endereco.complemento, endereco.bairro, endereco.cidade, endereco.uf, endereco.pais, endereco.tipoResidencia, endereco.tipoLogradouro, endereco.tipoEndereco] );
        entidade.id = idEndereco.rows[0].id;
        return entidade as Endereco;
    }
    alterar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
        throw new Error('Method not implemented.');
    }
    excluir(entidade: EntidadeDominio): boolean {
        throw new Error('Method not implemented.');
    }
    consultar(): Promise<EntidadeDominio[]> {
        throw new Error('Method not implemented.');
    }
    consultar2(entidade: EntidadeDominio): Promise<EntidadeDominio> {
        throw new Error('Method not implemented.');
    }
}