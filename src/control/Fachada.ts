import EntidadeDominio from "../model/entidade/entidade.model";
import IFachada from "./IFachada";
import IDAO from "../model/dao/IDAO";
import ClienteDAO from "../model/dao/ClienteDAO";
import ValidarDadosObrigatorios from "../model/strategy/validarDadosObrigatorios";
import IStrategy from "../model/strategy/IStrategy";
import EnderecoDAO from "../model/dao/EnderecoDAO";
import ValidarCPF from "../model/strategy/validarCPF";

export default class Fachada implements IFachada {
  daos: Map<string, IDAO>;
  rns: Map<string, IStrategy>;
  rns_cliente: any = [];

  constructor() {
    this.daos = new Map<string, IDAO>();
    this.rns = new Map<string, IStrategy>();
    this.definirDAOS();
    this.definirRNS();
  }

  definirDAOS() {
    this.daos.set("Cliente", new ClienteDAO());
    this.daos.set("Endereco", new EnderecoDAO());
  }
  definirRNS() {
    this.rns.set("ValidarCliente", new ValidarDadosObrigatorios());
    this.rns.set("ValidarCpf", new ValidarCPF());

    this.rns_cliente = ["ValidarCliente", "ValidarCpf"];

    // this.rns_cliente.push(ValidarDadosObrigatorios);
    // this.rns_cliente.push(ValidarCPF);
  }

  async processarStrategys(entidade: EntidadeDominio) {
    let final_msg: string = "";
    if (entidade.constructor.name == "Cliente") {
      this.rns_cliente.forEach((strategy: any) => {
        let cliente = this.rns.get(strategy);
        let msgn = cliente?.processar(entidade);

        if (msgn != null) {
          final_msg += msgn;
        }
      });
    }

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
}
