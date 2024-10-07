import { MockRepositoryImplementation } from '../infrastructure/repositories/mock.repository';
import { expect, describe, it } from '@jest/globals';
import { CryptoAdapter } from '../../adapters/crypto/cryptoAdapter';
import { CreateUserService } from '../application/services/createUser.service';
import { FindUserService } from '../application/services/findUser.service';
import { UpdateUserService } from '../application/services/updateUser.service';
import { FindAllUsersService } from '../application/services/findAll.service';

describe('User services', () => {
  const userRepository = new MockRepositoryImplementation();
  const createUserService = new CreateUserService(
    userRepository,
    new CryptoAdapter(),
  );
  const findUserService = new FindUserService(userRepository);
  const updateUserService = new UpdateUserService(userRepository);
  const findAllUsersService = new FindAllUsersService(userRepository);

  let uuid = '';

  it('should create a user', async () => {
    const user = {
      name: 'John',
      lastname: 'Doe',
      address: '123456',
      profilePicture: '123456',
      password: '123456',
    };
    const createdUser = await createUserService.execute(user);
    uuid = createdUser.uuid;
    expect(createdUser).toBeDefined();
    expect(createdUser?.name).toBe(user.name);
    expect(createdUser?.lastname).toBe(user.lastname);
    expect(createdUser?.address).toBe(user.address);
    expect(createdUser?.profilePicture).toBe(user.profilePicture);
    expect(createdUser?.password).not.toBe(user.password);
  });

  it('should find a user by name', async () => {
    const name = 'John';
    const foundUser = await findUserService.execute({ name });

    expect(foundUser).toBeDefined();
    expect(foundUser?.name).toBe(name);
    expect(foundUser).toHaveProperty('password');
  });

  it('should NOT find a user by name if the user doesnt exist', async () => {
    const name = 'Jonn';
    await expect(findUserService.execute({ name })).rejects.toThrow(Error);
  });

  it('should update a user', async () => {
    const user = {
      name: 'John',
      lastname: 'Doe',
      address: '123456',
      profilePicture: '123456',
    };
    const updatedUser = await updateUserService.execute(uuid, user);

    expect(updatedUser).toBeDefined();
    expect(updatedUser?.name).toBe(user.name);
    expect(updatedUser?.lastname).toBe(user.lastname);
    expect(updatedUser?.address).toBe(user.address);
    expect(updatedUser?.profilePicture).toBe(user.profilePicture);
  });

  it('should find all users', async () => {
    const users = await findAllUsersService.execute();

    expect(users).toBeDefined();
    expect(users).toHaveLength(1);
  });
});
