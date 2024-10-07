import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../jwt/jwtAdapter';

@Injectable()
export class ValidateTokenMiddleware implements NestMiddleware {
  constructor(private readonly jwt: JwtAdapter) {}
  use(req: Request, res: Response, next: NextFunction) {
    let token = req.headers.authorization;
    if (token.includes('Bearer')) {
      token = token?.replace('Bearer ', '');
    } else {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .send('Token must follow Bearer standard');
    }
    if (!token) {
      return res.status(HttpStatus.UNAUTHORIZED).send('No Token Provided');
    }
    const isValid = this.jwt.validateToken(token);
    if (!isValid) {
      return res.status(HttpStatus.UNAUTHORIZED).send('Invalid Token');
    }
    next();
  }
}
