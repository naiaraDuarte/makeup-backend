import IDAO from './IDAO';
import EntidadeDominio from '../entidade/entidade.model';
import { db } from '../../db.config';
import Cliente from '../entidade/cliente.model';
import EnderecoDAO from './EnderecoDAO';
import Endereco from '../entidade/endereco';

export default class ClienteDAO implements IDAO {
   
    async salvar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
       const cliente = entidade as Cliente;
       let enderecoDAO = new EnderecoDAO();
       let clientes = await db.query('INSERT INTO clientes (nome, data_nasc, cpf, tipo_telefone, telefone, sexo, email, senha) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [cliente.nome, cliente.dataNasc, cliente.cpf, cliente.tipoTelefone, cliente.telefone, cliente.sexo, cliente.email, cliente.senha]);
       
      // let endereco = cliente.endereco as unknown as Endereco;

       let endereco = Object.assign(new Endereco(), cliente.endereco);
       let idEndereco = enderecoDAO.salvar(endereco as Endereco);

       return entidade as Cliente;

    }
    async alterar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
        const cliente = entidade as Cliente;
        let clientes = await db.query('UPDATE clientes SET nome=$1, data_nasc=$2, cpf=$3, tipo_telefone=$4, telefone=$5, sexo=$6, email=$7, senha=$8 WHERE id=$9', [cliente.nome, cliente.dataNasc, cliente.cpf, cliente.tipoTelefone, cliente.telefone, cliente.sexo, cliente.email, cliente.senha, cliente.id]);
        return entidade as Cliente;
    }
    excluir(entidade: EntidadeDominio): boolean {
        const cliente = entidade as Cliente;
        let clientes = db.query('DELETE FROM public.clientes WHERE id=$1', [cliente.id]);
        return true;
    }
    async consultar() : Promise<Array<EntidadeDominio>> {
        let clientes = db.query('SELECT * FROM clientes');
        let result: Array<EntidadeDominio> = [];

        result = await clientes.then((dados) => {
            return result = dados.rows.map((cliente) => {
                 return cliente as Cliente
                // return  {
                //     id: cliente.id_cliente,
                //     nome: cliente.nome_cliente,
                //     dataNasc: cliente.data_nasc_cliente,
                //     cpf: cliente.cpf_cliente,
                //     tipoTelefone: cliente.tipo_telefone_cliente,
                //     telefone: cliente.telefone,
                //     sexo: cliente.sexo_cliente,
                //     email: cliente.email_cliente,
                //     senha: cliente.senha_cliente
                // } as Cliente;
            });
        });
        
        return result;
    }
    consultar2(entidade: EntidadeDominio): Promise<EntidadeDominio> {
        throw new Error('Method not implemented.');
    }
}