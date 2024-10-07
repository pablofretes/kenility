import { UserRepository } from '../../domain/user.repository';
import { User } from '../../domain/user';
import { Injectable } from '@nestjs/common';
import { UserNotFoundException } from '../../domain/exceptions/userNotFound.exception';
import { UserNotUpdatedException } from '../../domain/exceptions/userNotUpdated.exception';
import { UpdateUserDto } from '../dtos/updateUser.dto';

@Injectable()
export class UpdateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(uuid: string, updateData: UpdateUserDto): Promise<User> {
    try {
      const existingUser = await this.userRepository.findByUuid(uuid);
      if (!existingUser) throw new UserNotFoundException(uuid);

      const updatedUser = {
        ...existingUser,
        ...updateData,
        uuid: existingUser.uuid,
        password: existingUser.password,
      };

      const result = await this.userRepository.updateUser(uuid, updatedUser);
      if (!result) throw new UserNotUpdatedException(uuid);

      return result;
    } catch (error) {
      if (
        error instanceof UserNotFoundException ||
        error instanceof UserNotUpdatedException
      ) {
        throw error;
      }
      throw new UserNotUpdatedException(uuid);
    }
  }
}
