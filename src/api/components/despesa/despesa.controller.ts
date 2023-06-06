import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Despesa } from './despesa.entity';

export class DespesaController {
  public async list(req: Request, res: Response) {

    const despesas = await AppDataSource.manager.find(Despesa)

    return res.status(200).json({ dados: despesas, total: despesas.length });
  }

  public async create(req: Request, res: Response) {

    //aqui que pegamos o dados para cadastrar uma nova despesa

    // let descricao = req.body.descricao;
    // let valor = req.body.valor;
    // let data = req.body.data;

    let { descricao, valor, data } = req.body;

    let desp = new Despesa();
    desp.descricao = descricao;
    desp.data = data;
    desp.valor = valor;

    const _despesa = await AppDataSource.manager.save(desp);

    return res.status(201).json(_despesa);
  }

  public async update(req: Request, res: Response) {

    // const cod = req.params.cod;
    const { cod } = req.params;

    const despesa = await AppDataSource.manager.findOneBy(Despesa, { id: cod });

    if (despesa == null) {
      return res.status(404).json({ erro: 'Despesa não encontrada!' });
    }

    let { descricao, valor, data, data_efetivacao, valor_pago } = req.body;

    despesa.descricao = descricao;
    despesa.data = data;
    despesa.data_efetivacao = data_efetivacao;
    despesa.valor = valor;
    despesa.valor_pago = valor_pago;

    if (valor_pago >= despesa.valor) {
      despesa.pago = true;
    }

    const despesa_salva = await AppDataSource.manager.save(despesa);

    return res.json(despesa_salva);
  }

  public async destroy(req: Request, res: Response) {
    const { cod } = req.params;

    const despesa = await AppDataSource.manager.findOneBy(Despesa, { id: cod });

    if (despesa == null) {
      return res.status(404).json({ erro: 'Despesa não encontrada!' });
    }

    await AppDataSource.manager.delete(Despesa, despesa);

    return res.status(204).json();
  }

  public async show(req: Request, res: Response) {
    const { cod } = req.params;

    const despesa = await AppDataSource.manager.findOneBy(Despesa, { id: cod });

    if (despesa == null) {
      return res.status(404).json({ erro: 'Despesa não encontrada!' });
    }

    return res.json(despesa);
  }
}
