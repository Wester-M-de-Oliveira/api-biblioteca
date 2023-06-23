import { validate } from 'class-validator';
import { Response, Request } from "express";
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Contato } from "./contato.entity";

export class ContatoController{

    public async list(req:Request, res:Response){

        const  contato = await AppDataSource.manager.find(Contato);
        res.status(200).json({ dados: contato });
    }

    public async create(req: Request, res: Response){

        let rede_social = req.body.rede_social;
        let email = req.body.email;
        let celular = req.body.celular;
        let telefone = req.body.telefone;

        let cont = new Contato();
        cont.rede_social = rede_social;
        cont.email = email;
        cont.celular = celular;
        cont.telefone = telefone;

        const erros = await validate(cont);

        if(erros.length > 0) {
            return res.status(400).json(erros);
        }

        const _contato = await AppDataSource.manager.save(cont);
        return res.status(201).json(_contato);
    }

    public async update( req: Request, res: Response){
        const {cod} = req.params;

        const contato = await AppDataSource.manager.findOneBy(Contato, {id: parseInt (cod)});

        if(contato == null ){
            return res.status(404).json({ erro: 'Contato não encontrado!'});
        }

        let {rede_social, email, celular, telefone} = req.body;

        contato.rede_social = rede_social;
        contato.email = email;
        contato.celular = celular;
        contato.telefone = telefone;

        const contato_salvo = await AppDataSource.manager.save(contato);

        return res.json(contato_salvo);
    }

    public async destroy(req: Request, res: Response){

        const {cod} = req.params;

        const contato= await AppDataSource.manager.findOneBy(Contato, {id: parseInt (cod)});

        if(contato == null ){
            return res.status(404).json({ erro: 'Contato não encontrado!'});
        }

        await AppDataSource.manager.delete(Contato, contato);

        return res.status(204).json();

    }

    public async show(req: Request, res: Response){

        const {cod} = req.params;

        if(!Number.isInteger(parseInt(cod))) {
            return res.status(400).json();
        }

        const contato= await AppDataSource.manager.findOneBy(Contato, {id: parseInt (cod)});
        if(contato == null ){
            return res.status(404).json({ erro: 'Contato não encontrado!'});
        }

        return res.json(contato);

    }
}