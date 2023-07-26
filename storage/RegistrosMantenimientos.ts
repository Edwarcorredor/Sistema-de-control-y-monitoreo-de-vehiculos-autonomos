import { Type, Transform, Expose } from "class-transformer";
import { IsDefined, IsNumber } from 'class-validator';
import {conexion} from '../db/conexion_db.js'

export class RegistrosMantenimientos{

    /**
    ** Variables de entrada:
    ** id_alarma, costo 
    */

    @Expose({name: "ALARMA_ID"})
    @IsNumber({}, {message: ()=>{throw {status: 406, message:"El formato del parametro ALARMA_ID no es correcto"}}})
    @IsDefined({message: ()=>{ throw {status:422, message: "El parametro ALARMA_ID es obligatorio"}}})
    id_alarma: number

    @Expose({name: "COST"})
    @IsNumber({}, {message: ()=>{throw {status: 406, message:"El formato del parametro COST no es correcto"}}})
    @IsDefined({message: ()=>{ throw {status:422, message: "El parametro COST es obligatorio"}}})
    costo: number

    constructor(p1:number = 1, p2:number = 1 ){
        this.id_alarma = p1;
        this.costo = p2;
    }

    set guardar(body:object){
        conexion.query(/*sql*/`INSERT INTO registro_mantenimiento SET ?`,
        body,
        (err, data, fields)=>{
         console.log(err)
         console.log(data)
         console.log(fields)
        });
    }

    get allTabla(){
        const cox = conexion.promise();
        return (async()=>{
          const [rows, fields] = await cox.execute(/*sql*/`
          SELECT * FROM registro_mantenimiento
          `);
          return rows;
        })();
    }
}