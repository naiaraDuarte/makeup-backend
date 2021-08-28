import IDAO from './IDAO';
import EntidadeDominio from '../entidade/entidade.model';
import { db } from '../../db.config';
import Cliente from '../entidade/cliente.model';
import Endereco from '../entidade/endereco';

export default class EnderecoDAO implements IDAO {
    async salvar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
        console.log("VAMO VER O QUE CHEGA", entidade)
        const endereco = entidade as Endereco;
        
        // let clientes = await db.query('INSERT INTO enderecos(id, nome, cep, logradouro, numero, complemento, bairro, cidade, uf, pais, tipo_residencia, tipo_logradouro, tipo_endereco) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
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