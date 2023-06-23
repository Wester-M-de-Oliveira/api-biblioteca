import { validate } from 'class-validator';
import { Response, Request } from "express";
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Autor } from "./autor.entity";

export class AutorController{

    public async list(req:Request, res:Response){

        const  autor = await AppDataSource.manager.find(Autor);

        res.status(200).json({ dados: autor });
    }

    public async create(req: Request, res: Response){
        let autor = new Autor();
        autor.nome = req.body.nome;
        autor.nacionalidade = req.body.nacionalidade;
        autor.data_nascimento = req.body.data_nascimento;
        autor.perfil = req.body.perfil;

        const erros = await validate(autor);

        if(erros.length > 0) {
            return res.status(400).json(erros);
        }

        const _autor = await AppDataSource.manager.save(autor);
        return res.status(201).json(_autor);

    }

    public async update( req: Request, res: Response){
        const {cod} = req.params;

        const autor = await AppDataSource.manager.findOneBy(Autor, {id: parseInt (cod)});
        if(autor == null ){
            return res.status(404).json({ erro: 'Autor não encontrado!'});
        }

        let {nome, nacionalidade, data_nascimento, perfil} = req.body;

        autor.nome = nome;
        autor.nacionalidade = nacionalidade;
        autor.data_nascimento = data_nascimento;
        autor.perfil = perfil;

        const autor_salvo = await AppDataSource.manager.save(autor);

        return res.json(autor_salvo);
    }

    public async destroy(req: Request, res: Response){

        const {cod} = req.params;

        const autor = await AppDataSource.manager.findOneBy(Autor, {id: parseInt (cod)});

        if(autor == null ){
            return res.status(404).json({ erro: 'Autor não encontrado!'});
        }

        await AppDataSource.manager.delete(Autor, autor);

        return res.status(204).json();

    }

    public async show(req: Request, res: Response){

        const {cod} = req.params;

        if(!Number.isInteger(parseInt(cod))) {
            return res.status(400).json();
        }

        const autor = await AppDataSource.manager.findOneBy(Autor, {id: parseInt (cod)});

        if(autor == null ){
            return res.status(404).json({ erro: 'Autor não encontrado!'});
        }

        return res.json(autor);

    }
}