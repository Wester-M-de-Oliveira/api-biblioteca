import { validate } from 'class-validator';
import { Response, Request } from "express";
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Pessoa } from "./pessoa.entity";
import { Contato } from "../contato/contato.entity";
import { Endereco } from "../endereco/endereco.entity";


export class PessoaController{

    public async list(req:Request, res:Response){

        const  pessoa = await AppDataSource.manager.find(Pessoa);
        res.status(200).json({ dados: pessoa });
    }

    public async create(req: Request, res: Response){

        const _contato = await AppDataSource.manager.findOneBy(Contato, { id: contato_id });
        if(req.body.contato_id == undefined || _contato == null ) {
            return res.status(404).json({ erro: 'Contato inexistente'})
        }
        const _endereco = await AppDataSource.manager.findOneBy(Endereco, { id: endereco_id });

        if(req.body.endereco_id == undefined || _endereco == null) {
            return res.status(404).json({ erro: 'Endereço inexistente'})
        }

        let pessoa = new Pessoa();
        pessoa.nome = req.body.nome;
        pessoa.cpf = req.body.cpf;
        pessoa.rg = req.body.rg;
        pessoa.data_nascimento = req.body.data_nascimento;
        pessoa.sexo = req.body.sexo;
        pessoa.contato_id = req.body.contato_id;
        pessoa.endereco_id = req.body.endereco_id;

        const erros = await validate(pessoa);

        if(erros.length > 0) {
            return res.status(400).json(erros);
        }

        const _pessoa = await AppDataSource.manager.save(pessoa);

        return res.status(201).json(_pessoa);
    }

    public async update( req: Request, res: Response){
        const {cod} = req.params;

        const pessoa = await AppDataSource.manager.findOneBy(Pessoa, {id: parseInt (cod)});

        if(pessoa == null ){
            return res.status(404).json({ erro: 'Pessoa não encontrada!'});
        }

        let {nome, cpf, rg, data_nascimento, sexo, contato_id, endereco_id} = req.body;

        pessoa.nome = nome;
        pessoa.cpf = cpf;
        pessoa.rg = rg;
        pessoa.data_nascimento = data_nascimento;
        pessoa.sexo = sexo;
        pessoa.contato_id = contato_id;
        pessoa.endereco_id = endereco_id;

        const pessoa_salva = await AppDataSource.manager.save(pessoa);

        return res.json(pessoa_salva);
    }

    public async destroy(req: Request, res: Response){

        const {cod} = req.params;

        const pessoa = await AppDataSource.manager.findOneBy(Pessoa, {id: parseInt (cod)});

        if(pessoa == null ){
            return res.status(404).json({ erro: 'Pessoa não encontrada!'});
        }

        await AppDataSource.manager.delete(Pessoa, pessoa);

        return res.status(204).json();

    }

    public async show(req: Request, res: Response){

        const {cod} = req.params;

        if(!Number.isInteger(parseInt(cod))) {
            return res.status(400).json();
        }

        const pessoa = await AppDataSource.manager.findOneBy(Pessoa, {id: parseInt (cod)});

        if(pessoa == null ){
            return res.status(404).json({ erro: 'Pessoa não encontrada!'});
        }

        return res.json(pessoa);

    }
}