import express from 'express';
import 'reflect-metadata';
import {plainToClass} from 'class-transformer';
import {Vehiculos} from '../controller/Vehiculos.js'
import {validate} from 'class-validator';
const middleVehiculos = express();

middleVehiculos.use(async(req,res,next)=>{

    try {
        if(req.method=="GET"){
            var data = plainToClass(Vehiculos, req.data.interfaceData, { excludeExtraneousValues: true });
        }
        else{
            var data = plainToClass(Vehiculos, req.body, { excludeExtraneousValues: true });
        }
        await validate(data);
        req.body = data;
        req.data = JSON.stringify(data);
        next();
    } catch (err) {
        res.status(err.status).json(err)
    }
})

export {middleVehiculos}