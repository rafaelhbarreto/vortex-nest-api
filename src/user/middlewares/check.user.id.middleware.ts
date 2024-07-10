import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class CheckUserIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);

    if (id <= 0 || isNaN(id)) {
      res.status(400).send({ message: 'Invalid id' });
      return;
    }

    next();
  }
}
