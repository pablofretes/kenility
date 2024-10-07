import { UserNotFoundException } from '../../domain/exceptions/userNotFound.exception';
import { User } from '../../domain/user';
import { UserEntity } from '../../domain/user.entity';
import { UserRepository } from '../../domain/user.repository';

export class MockRepositoryImplementation implements UserRepository {
  private readonly users: User[] = [];

  async findAll(): Promise<User[]> {
    return Promise.resolve(this.users);
  }

  async findUserByName(name: string): Promise<User> {
    const user = this.users.find((u) => u.name === name);
    if (!user) throw new UserNotFoundException(name);
    return Promise.resolve(user);
  }

  async findByUuid(uuid: string): Promise<User> {
    const user = this.users.find((u) => u.uuid === uuid);
    if (!user) throw new UserNotFoundException(uuid);
    return Promise.resolve(user);
  }

  async updateUser(uuid: string, user: UserEntity): Promise<User> {
    const userIndex = this.users.findIndex((u) => u.uuid === uuid);
    if (userIndex === -1) throw new UserNotFoundException(uuid);
    this.users[userIndex] = new User(user);
    return Promise.resolve(this.users[userIndex]);
  }

  async createUser(user: UserEntity): Promise<User> {
    const newUser = new User(user);
    this.users.push(newUser);
    return Promise.resolve(newUser);
  }
}
