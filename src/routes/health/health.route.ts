import { Request, Response, Router } from 'express';

const healthRouter = Router();

export class HealthRoute {
  constructor() {}
  
  public async init() {
    healthRouter.get('/', this.getHealth);
  }

  public async getHealth(req: Request, res: Response) {
    res.status(200).json({ status: 'OK' });
  }

  getHealthRoute() {
    return healthRouter;
  }
}

