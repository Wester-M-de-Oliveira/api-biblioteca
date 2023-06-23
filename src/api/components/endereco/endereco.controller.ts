import { validate } from 'class-validator';
import { Response, Request } from "express";
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Endereco } from "./endereco.entity";

export class EnderecoController{

    public async list(req:Request, res:Response){

        const endereco= await AppDataSource.manager.find(Endereco);
        res.status(200).json({ dados: endereco });
    }

    public async create(req: Request, res: Response){
        let endereco = new Endereco();
        endereco.numero = req.body.numero;
        endereco.bairro = req.body.bairro;
        endereco.cidade = req.body.cidade;
        endereco.estado = req.body.estado;
        endereco.cep = req.body.cep;
        endereco.rua = req.body.rua;
        endereco.pais = req.body.pais;
        endereco.complemento = req.body.complemento;

        const erros = await validate(endereco);

        if(erros.length > 0) {
            return res.status(400).json(erros);
        }

        const _endereco = await AppDataSource.manager.save(endereco);

        return res.status(201).json(_endereco);
    }

    public async update( req: Request, res: Response){
        const {cod} = req.params;

        const endereco = await AppDataSource.manager.findOneBy(Endereco, {id: parseInt (cod)});

        if(endereco == null ){
            return res.status(404).json({ erro: 'Endereço não encontrado!'});
        }

        let {numero, bairro, cidade, estado,cep, rua, pais, complemento} = req.body;

        endereco.numero = numero;
        endereco.bairro = bairro;
        endereco.cidade = cidade;
        endereco.estado = estado;
        endereco.cep = cep;
        endereco.rua = rua;
        endereco.pais = pais;
        endereco.complemento = complemento;

        const endereco_salvo = await AppDataSource.manager.save(endereco);

        return res.json(endereco_salvo);
    }

    public async destroy(req: Request, res: Response){

        const {cod} = req.params;

        const endereco = await AppDataSource.manager.findOneBy(Endereco, {id: parseInt (cod)});

        if(endereco == null ){
            return res.status(404).json({ erro: 'Endereço não encontrado!'});
        }

        await AppDataSource.manager.delete(Endereco, endereco);

        return res.status(204).json();

    }

    public async show(req: Request, res: Response){

        const {cod} = req.params;

        if(!Number.isInteger(parseInt(cod))) {
            return res.status(400).json();
        }

        const endereco = await AppDataSource.manager.findOneBy(Endereco, {id: parseInt (cod)});

        if(endereco == null ){
            return res.status(404).json({ erro: 'Endereço não encontrado!'});
        }

        return res.json(endereco);

    }
}