import { JWT_SECRET } from '@app/config';
import { ExpressInterfaceRequest } from '@app/types/expressRequest.interface';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UserService } from '@user/user.service';

@Injectable()
export class AuthMiddlware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: ExpressInterfaceRequest, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decode = verify(token, JWT_SECRET);
      const user = await this.userService.getUserById(decode.id);
      req.user = user;
      next();
    } catch (err) {
      req.user = null;
      next();
    }
  }
}
