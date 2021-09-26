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
import CupomDAO from "../model/dao/CupomDAO";
import PedidoDAO from "../model/dao/PedidoDAO";
import ValidarEstoque from "../model/strategy/validarEstoque"
import ValidarValorCartao from "../model/strategy/validarValorCartao";
import CashbackDAO from "../model/dao/CashbackDAO";
import ValidarEndereco from "../model/strategy/validarEndereco";

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
    this.daos.set("Cupom", new CupomDAO());
    this.daos.set("Pedido", new PedidoDAO());
    this.daos.set("Cashback", new CashbackDAO());
  }

  definirRNS() {
    let validarCpf = new ValidarCPF();
    let validarDadosObrigatorios = new ValidarDadosObrigatorios();
    let validarCartao = new ValidarCartao();
    let validarEstoque = new ValidarEstoque();
    let validarValorCartao = new ValidarValorCartao();
    let validarEndereco = new ValidarEndereco();

    // let criptografarSenha = new CriptografarSenha();
    // let validarExistencia = new ValidarExistencia();

    this.rns.set("Cliente",
      [
        validarCpf,
        validarDadosObrigatorios,
        // criptografarSenha
      ]);
    this.rns.set("Cartao", [validarCartao]);
    this.rns.set("Pedido", [validarEstoque, validarValorCartao]);
    this.rns.set("Endereco", [validarEndereco])

  }

  async processarStrategys(entidade: EntidadeDominio): Promise<string> {
    let nomeClasse = entidade.constructor.name;
    let final_msg: string = 'Erro na execução das regras';

    for (const s of this.rns.get(nomeClasse)!) {
      final_msg = await s.processar(entidade);
      console.log("msgn", final_msg)
      if (final_msg != "") break;
    }
    return final_msg;
  }

  // async processarStrategys(entidade: EntidadeDominio) {
  //   let final_msg = new Array<string>();
  //   let nomeClasse: string = entidade.constructor.name;

  //   this.rns.get(nomeClasse)?.forEach(e => {
  //     let msgn =  e?.processar(entidade);
  //     if(msgn != "")        
  //       final_msg.push(msgn);      

  //   })
  //   console.log("array", final_msg)
  //   return final_msg!;

  // }

  async cadastrar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
    let msg = await this.processarStrategys(entidade);

    if (msg == "") {
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
