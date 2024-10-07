import { UserRepository } from '../../domain/user.repository';
import { User } from '../../domain/user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllUsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    try {
      const users = await this.userRepository.findAll();
      return users;
    } catch (error) {
      throw new Error('Failed to fetch all users');
    }
  }
}
