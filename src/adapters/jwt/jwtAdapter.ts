import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

interface DecodedToken {
  name: string;
}

@Injectable()
export class JwtAdapter {
  generateToken({ name }: DecodedToken): string {
    const token = jwt.sign({ name }, process.env.JWT_SECRET as string);
    return token;
  }

  validateToken(token: string): Boolean {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
      ) as DecodedToken;
      if (decoded && decoded.name) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  decodeToken(token: string): DecodedToken {
    try {
      const decodedToken = jwt.decode(token) as DecodedToken;
      return decodedToken;
    } catch (error) {
      return { name: '' };
    }
  }
}
