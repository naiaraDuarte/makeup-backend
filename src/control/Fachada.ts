import EntidadeDominio from "../model/entidade/entidadeDominio";
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
import ValidarExistencia from "../model/strategy/validarExistencia";
import CategoriaDAO from "../model/dao/CategoriaDAO";
import ValidarCupom from "../model/strategy/validarCupom";
import ValidarCupomPedido from "../model/strategy/ValidarCupomPedido";
import ProdutoPedidoDAO from "../model/dao/ProdutoPedidoDAO";
import GerarPrecoProduto from "../model/strategy/gerarPrecoProduto";
import FiltroDAO from "../model/dao/FiltroDAO";
// import ValidarCashback from "../model/strategy/ValidarCashback";

// import ValidarExistencia from "../model/strategy/validarExistencia";


export default class Fachada implements IFachada {
  daos: Map<string, IDAO>;
  rns: Map<string, IStrategy[]>;
  
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
    this.daos.set("Categoria", new CategoriaDAO());
    this.daos.set("ProdutoPedido", new ProdutoPedidoDAO());
    this.daos.set("Filtro", new FiltroDAO());
  }

  definirRNS() {
    let validarCpf = new ValidarCPF();
    let validarDadosObrigatorios = new ValidarDadosObrigatorios();
    let validarCartao = new ValidarCartao();
    let validarEstoque = new ValidarEstoque();
    let validarValorCartao = new ValidarValorCartao();
    let validarEndereco = new ValidarEndereco();
    let validarExistencia = new ValidarExistencia();    
    let validarCupom = new ValidarCupom();
    let validarCupomPedido = new ValidarCupomPedido();
    let gerarPrecoProduto = new GerarPrecoProduto();
    // let validarCashback = new ValidarCashback();

    this.rns.set("Cliente",
      [
        validarCpf,
        validarDadosObrigatorios,
        validarExistencia
      ]);
    this.rns.set("Cartao", [validarCartao]);
    this.rns.set("Pedido", [validarEstoque, validarValorCartao, validarCupomPedido]);
    this.rns.set("Endereco", [validarEndereco])
    this.rns.set("Cashback", [])
    this.rns.set("Cashback", [])
    this.rns.set("Cupom", [validarCupom])
    this.rns.set("Produto", [gerarPrecoProduto])
    this.rns.set("ProdutoPedido", [])
  }
  

  async processarStrategys(entidade: EntidadeDominio, altera: boolean): Promise<string> {
    let nomeClasse = entidade.constructor.name;
    let final_msg = "";
    let mensagem = [];
    for (const s of this.rns.get(nomeClasse)!) {
      final_msg = await s.processar(entidade, altera);
      if (final_msg != null) {
        mensagem.push(final_msg);
      }    
      
      entidade.msgn = mensagem; 
    } 
    return (mensagem.length > 0) ? final_msg: "";
  }

  async cadastrar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
    let msg = await this.processarStrategys(entidade, false); 
    
    if (msg == "") {
      let nomeClasse: string = entidade.constructor.name;
      let retorno = await this.daos.get(nomeClasse)?.salvar(entidade);
      return retorno as EntidadeDominio;
      }
      entidade.msgn   
    return entidade;
  }

  async alterar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
    let msg = await this.processarStrategys(entidade, true);    
    
    if (msg == "") {
      let nomeClasse: string = entidade.constructor.name;
      let retorno = await this.daos.get(nomeClasse)?.alterar(entidade,);
      return retorno as EntidadeDominio;
      }
      entidade.msgn   
    return entidade;
    // let nomeClasse: string = entidade.constructor.name;
    // let retorno = await this.daos.get(nomeClasse)?.alterar(entidade);
    // return retorno as EntidadeDominio;

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
    let retorno = (await this.daos.get(nomeClasse)?.consultarComId(entidade)) ?? [];
    
    return retorno
  }

  async consultarPedido(entidade: EntidadeDominio, id: Number): Promise<EntidadeDominio[]> {
    let nomeClasse: string = entidade.constructor.name;
    return (await this.daos.get(nomeClasse)?.consultarPedido(entidade, id)) ?? [];
  }


  async consultarLogin(entidade: EntidadeDominio): Promise<EntidadeDominio[]> {
    const cliente = new ClienteDAO()
    return await cliente.consultarLogin(entidade) ?? [];
  }
  
}
