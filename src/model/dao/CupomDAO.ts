import entidadeModel from "../entidade/entidade.model";
import Cupom from "../entidade/cupom";
import IDAO from "./IDAO";
import { db } from '../../db.config';
import EntidadeDominio from "../entidade/entidade.model";

export default class CupomDAO implements IDAO {
    async salvar(entidade: entidadeModel): Promise<entidadeModel> {
        const cupom = entidade as Cupom;
        let idCupom = await db.query(
            "INSERT INTO cupons (porcen, quant, tipo, cod) VALUES ($1, $2, $3, $4) RETURNING id",
            [
                cupom.porcen,
                cupom.quant,
                cupom.tipo,
                cupom.cod

            ],
        );
        entidade.id = idCupom.rows[0].id;
        return entidade as Cupom;


    }
    async alterar(entidade: entidadeModel): Promise<entidadeModel> {
        const cupom = entidade as Cupom;
        await db.query(
            "UPDATE cupons SET porcen=$1, quant=$2, tipo=$3, cod=$4 WHERE id=$5",

            [
                cupom.porcen,
                cupom.quant,
                cupom.tipo,
                cupom.cod,
                cupom.id

            ]

        );
        
        return entidade as Cupom;

    }
    excluir(entidade: EntidadeDominio): boolean {
        
        const cupom = entidade as Cupom;
        db.query("DELETE FROM cupons WHERE id=$1", [cupom.id]);
        return true;
    }

    async consultar(): Promise<entidadeModel[]> {
        let cupons = db.query("SELECT * FROM cupons");
        let result: Array<EntidadeDominio> = [];

        result = await cupons.then((dados) => {
            return (result = dados.rows.map((cupom) => {
                return cupom as Cupom;
            }));
        });

        return result;
    }
    async consultarComId(entidade: EntidadeDominio): Promise<Array<EntidadeDominio>> {
        const cupom = entidade as Cupom;
        let cup = db.query("SELECT * FROM cupons WHERE id = $1", [cupom.id]);
        let result: Array<EntidadeDominio> = [];

        result = await cup.then((dados) => {
            return (result = dados.rows.map((cupom) => {
                return cupom;
            }));
        });
        return result;
    }
}