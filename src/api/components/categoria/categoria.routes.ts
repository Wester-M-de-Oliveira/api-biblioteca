import { Router } from 'express';
import { CategoriaController } from './categoria.controller';

export class CategoriaRoutes {
  private router: Router = Router();

  private controller: CategoriaController;

  constructor() {
    this.controller = new CategoriaController();
    this.init();
  }

  private init(): void {
    this.router.get('/', this.controller.list);
  }

  public routes(): Router {
    return this.router;
  }
}
