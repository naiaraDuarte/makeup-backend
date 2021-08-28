import EntidadeDominio from "../model/entidade/entidade.model";
import IFachada from "./IFachada";
import IDAO from "../model/dao/IDAO";
import ClienteDAO from "../model/dao/ClienteDAO";
import Cliente from "../model/entidade/cliente.model";

export default class Fachada implements IFachada {
  daos: Map<string, IDAO>;

  constructor() {
    this.daos = new Map<string, IDAO>();
    this.definirDAOS();
    this.definirRNS();
  }

  definirDAOS() {
    this.daos.set("Cliente", new ClienteDAO());
  }
  definirRNS() {}

  async cadastrar(entidade: EntidadeDominio): Promise<string> {
    let nomeClasse: string = entidade.constructor.name;
    this.daos.get(nomeClasse)?.salvar(entidade);
    return "";
  }
  async alterar(entidade: EntidadeDominio): Promise<string> {
    let nomeClasse: string = entidade.constructor.name;
    this.daos.get(nomeClasse)?.alterar(entidade);
    return "";
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
}
