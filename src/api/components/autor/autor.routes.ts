import { Router } from 'express';
import { AutorController } from './autor.controller';

export class AutorRoutes {
    private router: Router = Router();
    private controller: AutorController;

    constructor() {
        this.controller = new AutorController();
        this.init();
    }

    private init(): void {
        this.router.get('/', this.controller.list.bind(this.controller));
        this.router.post('/', this.controller.create.bind(this.controller));
        this.router.put('/:cod', this.controller.update.bind(this.controller));
        this.router.delete('/:cod', this.controller.destroy.bind(this.controller));
        this.router.get('/:cod', this.controller.show.bind(this.controller));
    }

    public getRoutes(): Router {
        return this.router;
    }
}
