import { User } from './user';
import { UserEntity } from './user.entity';

export abstract class UserRepository {
  abstract createUser(user: UserEntity): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findUserByName(name: string): Promise<User>;
  abstract findByUuid(uuid: string): Promise<User>;
  abstract updateUser(uuid: string, user: UserEntity): Promise<User>;
}
