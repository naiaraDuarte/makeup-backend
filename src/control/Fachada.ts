import EntidadeDominio from "../model/entidade/entidade.model";
import IFachada from "./IFachada";
import IDAO from "../model/dao/IDAO";
import ClienteDAO from "../model/dao/ClienteDAO";
import ValidarDadosObrigatorios from "../model/strategy/validarDadosObrigatorios";
import IStrategy from "../model/strategy/IStrategy";
import EnderecoDAO from "../model/dao/EnderecoDAO";
import ValidarCPF from "../model/strategy/validarCPF";
import CartaoDAO from "../model/dao/CartaoDAO";
import ValidarCartao from "../model/strategy/validarCartao";
import ProdutoDAO from "../model/dao/ProdutoDAO";
import CriptografarSenha from "../model/strategy/criptografarSenha";
import Cliente from "../model/entidade/cliente.model";
import criptografarSenha from "../model/strategy/criptografarSenha";
// import ValidarExistencia from "../model/strategy/validarExistencia";


export default class Fachada implements IFachada {
  daos: Map<string, IDAO>;
  rns: Map<string, IStrategy[]>;
  // rns_cliente: any = [];
  // rns_cartao: any = [];
  // // rns_endereco: any = [];

  constructor() {
    this.daos = new Map<string, IDAO>();
    this.rns = new Map<string, IStrategy[]>();
    this.definirDAOS();
    this.definirRNS();
  }



  definirDAOS() {
    this.daos.set("Cliente", new ClienteDAO());
    this.daos.set("Endereco", new EnderecoDAO());
    this.daos.set("Cartao", new CartaoDAO());
    this.daos.set("Produto", new ProdutoDAO());
  }

  definirRNS() {
    let validarCpf = new ValidarCPF();
    let validarDadosObrigatorios = new ValidarDadosObrigatorios();
    let validarCartao = new ValidarCartao();
    let criptografarSenha = new CriptografarSenha();
    // let validarExistencia = new ValidarExistencia();

    this.rns.set("Cliente", 
    [
      validarCpf,
      validarDadosObrigatorios, 
      criptografarSenha
      ]);
    this.rns.set("Cartao",[validarCartao])    
  }

  async processarStrategys(entidade: EntidadeDominio) {
    let final_msg: string = "";
    let nomeClasse: string = entidade.constructor.name;

    this.rns.get(nomeClasse)?.forEach(e => {
      let msgn = e?.processar(entidade);
      if (msgn != null) {
        final_msg += msgn;
      }
    })
    console.log(final_msg);
    return final_msg;
   
  }

  async cadastrar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
    let msg = this.processarStrategys(entidade);

    if ((await msg) == "") {
      let nomeClasse: string = entidade.constructor.name;
      let retorno = await this.daos.get(nomeClasse)?.salvar(entidade);
      return retorno as EntidadeDominio;
    }
    return entidade;
  }

  async alterar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
    let nomeClasse: string = entidade.constructor.name;
    let retorno = await this.daos.get(nomeClasse)?.alterar(entidade);
    return retorno as EntidadeDominio;
  }
  excluir(entidade: EntidadeDominio): boolean {
    let nomeClasse: string = entidade.constructor.name;
    this.daos.get(nomeClasse)?.excluir(entidade);
    return true;
  }
  async consultar(entidade: EntidadeDominio): Promise<EntidadeDominio[]> {
    let nomeClasse: string = entidade.constructor.name;    
    return (await this.daos.get(nomeClasse)?.consultar()) ?? [];

  }

  async consultarComId(entidade: EntidadeDominio): Promise<EntidadeDominio[]> {
    let nomeClasse: string = entidade.constructor.name;
    return (await this.daos.get(nomeClasse)?.consultarComId(entidade)) ?? [];
  }

  async consultarLogin(entidade: EntidadeDominio): Promise<EntidadeDominio[]> {
    const cliente = new ClienteDAO()
    return await cliente.consultarLogin(entidade) ?? [];
  }
}
