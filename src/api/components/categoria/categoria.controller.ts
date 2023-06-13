import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Categoria } from './categoria.entity';

export class CategoriaController {
  public async list(req: Request, res: Response) {

    const categorias = await AppDataSource.manager.find(Categoria)

    return res.status(200).json({ dados: categorias, total: categorias.length });
  }
}
