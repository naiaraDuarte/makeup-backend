import EntidadeDominio from "./entidade.model";
import Categoria from "./categoria";

export default class Produto extends EntidadeDominio{
    cod!: string;
    nome!:string; 
    marca!:string; 
    tipo!:string; 
    peso!: Number; 
    altura!:Number; 
    comprimento!:Number; 
    quantidade!:Number; 
    imagem!:string; 
    largura!:Number; 
    diametro!:Number; 
    categoria!: Categoria; 
    custo!:Number;  
    descricao!:string; 
}