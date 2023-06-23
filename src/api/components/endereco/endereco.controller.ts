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

        let numero = req.body.numero;
        let bairro = req.body.bairro;
        let cidade = req.body.cidade;
        let estado = req.body.estado;
        let cep = req.body.cep;
        let rua = req.body.rua;
        let pais = req.body.pais;
        let complemento = req.body.complemento;

        let end = new Endereco();
        end.numero = numero;
        end.bairro = bairro;
        end.cidade = cidade;
        end.estado = estado;
        end.cep = cep;
        end.rua = rua;
        end.pais = pais;
        end.complemento = complemento;

        const erros = await validate(end);

        if(erros.length > 0) {
            return res.status(400).json(erros);
        }

        const _endereco = await AppDataSource.manager.save(end);

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