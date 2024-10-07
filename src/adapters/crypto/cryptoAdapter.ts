import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { PasswordNotHashedException } from './passwordNotHashed.exception';

@Injectable()
export class CryptoAdapter {
  hashPassword(password: string): string {
    const iterations = 1000;
    const keyLength = 64;
    const algorithm = 'sha512';
    const salt = process.env.SALT as string;
    try {
      const hash = crypto
        .pbkdf2Sync(password, salt, iterations, keyLength, algorithm)
        .toString('hex');
      return hash;
    } catch (error) {
      throw new PasswordNotHashedException();
    }
  }
}
