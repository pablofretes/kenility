import { Injectable } from '@nestjs/common';
import { UserNotFoundException } from '../../domain/exceptions/userNotFound.exception';
import { UserRepository } from '../../domain/user.repository';
import { FindUserDto } from '../dtos/findUser.dto';

@Injectable()
export class FindUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ name }: FindUserDto) {
    try {
      const user = await this.userRepository.findUserByName(name);
      if (!user) throw new UserNotFoundException(name);
      return user;
    } catch (error) {
      throw new UserNotFoundException(name);
    }
  }
}
