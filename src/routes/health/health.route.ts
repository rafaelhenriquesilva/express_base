import { Request, Response, Router } from 'express';

const healthRoute = Router();

export class HealthRoute {
  constructor() {}
  
  public async init() {
    healthRoute.get('/', this.getHealth);
  }

  public async getHealth(req: Request, res: Response) {
    res.status(200).json({ status: 'OK' });
  }

  getRoute() {
    return healthRoute;
  }
}

