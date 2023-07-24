import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import {Empresas} from "../controller/Empresas.js"


const middleEmpresas = (req, res, next) => {
    try{
        if(req.method === 'GET'){
            return next();
        }
        let data = plainToClass(Empresas, req.body);
        req.body = JSON.parse(JSON.stringify(data));
        next();
    } catch(Error){
        res.send("Error");
    }  
}

export default middleEmpresas;