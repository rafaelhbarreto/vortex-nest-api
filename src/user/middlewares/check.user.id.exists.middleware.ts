import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from '../user.service';

@Injectable()
export class CheckUserIdExistsMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const userId = Number(req.params.id);

    if (!(await this.userService.exists(userId))) {
      throw new NotFoundException('User not found');
    }

    next();
  }
}
