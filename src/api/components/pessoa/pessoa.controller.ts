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

        let nome = req.body.nome;
        let cpf = req.body.cpf;
        let rg = req.body.rg;
        let data_nascimento = req.body.data_nascimento;
        let sexo = req.body.sexo;
        let contato_id = req.body.contato_id;
        let endereco_id = req.body.endereco_id;

        if(contato_id == undefined) {
            return res.status(404).json({ erro: 'Contato inexistente'})
        }

        const _contato = await AppDataSource.manager.findOneBy(Contato, { id: contato_id });

        if(_contato == null) {
            return res.status(404).json({ erro: 'Contato inexistente'})
        }

        if(endereco_id == undefined) {
            return res.status(404).json({ erro: 'Endereço inexistente'})
        }

        const _cendereco = await AppDataSource.manager.findOneBy(Endereco, { id: endereco_id });

        if(_cendereco == null) {
            return res.status(404).json({ erro: 'Endereço inexistente'})
        }

        let pes = new Pessoa();
        pes.nome = nome;
        pes.cpf = cpf;
        pes.rg = rg;
        pes.data_nascimento = data_nascimento;
        pes.sexo = sexo;
        pes.contato_id = contato_id;
        pes.endereco_id = endereco_id;

        const erros = await validate(pes);

        if(erros.length > 0) {
            return res.status(400).json(erros);
        }

        const _pessoa = await AppDataSource.manager.save(pes);

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