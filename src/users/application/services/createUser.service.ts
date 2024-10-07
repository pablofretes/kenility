import { CryptoAdapter } from '../../../adapters/crypto/cryptoAdapter';
import { UserRepository } from '../../domain/user.repository';
import { User } from '../../domain/user';
import { CreateUserDto } from '../dtos/createUser.dto';
import { Injectable } from '@nestjs/common';
import { UserNotCreatedException } from '../../domain/exceptions/userNotCreated.exception';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptoAdapter: CryptoAdapter,
  ) {}

  async execute({
    name,
    lastname,
    address,
    profilePicture,
    password,
  }: CreateUserDto): Promise<User> {
    try {
      const hash = this.cryptoAdapter.hashPassword(password);
      const userVal = new User({
        name,
        lastname,
        address,
        profilePicture,
        password: hash,
      });
      const user = await this.userRepository.createUser(userVal);
      if (!user) throw new UserNotCreatedException();
      return user;
    } catch (error) {
      throw new UserNotCreatedException();
    }
  }
}
