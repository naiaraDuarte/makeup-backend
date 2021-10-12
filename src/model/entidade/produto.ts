import EntidadeDominio from "./entidadeDominio";
import Categoria from "./categoria";

export default class Produto extends EntidadeDominio{
    cod!: string;
    nome!:string; 
    marca!:string; 
    tipo!:string; 
    peso!: number; 
    altura!:number; 
    comprimento!:number; 
    quantidade!:number; 
    imagem!:string; 
    largura!:number; 
    diametro!:number; 
    categoria!: Categoria; 
    custo!:number;  
    descricao!:string; 
    preco!: number;
}