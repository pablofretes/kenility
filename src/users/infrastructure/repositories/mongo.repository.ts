import { UserNotFoundException } from 'src/users/domain/exceptions/userNotFound.exception';
import { UsersNotFoundException } from 'src/users/domain/exceptions/usersNotFound.exception';
import { UserNotCreatedException } from 'src/users/domain/exceptions/userNotCreated.exception';
import { User } from '../../domain/user';
import { UserEntity } from '../../domain/user.entity';
import { UserRepository } from '../../domain/user.repository';
import { UserDocument } from '../user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

@Injectable()
export class MongoRepository implements UserRepository {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userModel.find().lean();
      if (!users) throw new UsersNotFoundException();
      return users;
    } catch (error) {
      throw new UsersNotFoundException();
    }
  }

  async findUserByName(name: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ name }).lean();
      if (!user) throw new UserNotFoundException(name);
      return user;
    } catch (error) {
      throw new UserNotFoundException(name);
    }
  }

  async findByUuid(uuid: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ uuid }).lean();
      if (!user) throw new UserNotFoundException(uuid);
      return user;
    } catch (error) {
      throw new UserNotFoundException(uuid);
    }
  }

  async updateUser(uuid: string, user: UserEntity): Promise<User> {
    try {
      const updatedUser = await this.userModel
        .findOneAndUpdate({ uuid: uuid }, { $set: user }, { new: true })
        .lean();
      if (!updatedUser) throw new UserNotFoundException(uuid);
      return updatedUser;
    } catch (error) {
      throw new UserNotFoundException(uuid);
    }
  }

  async createUser(userIn: UserEntity): Promise<User> {
    try {
      const user = await this.userModel.create(userIn);
      if (!user) throw new UserNotCreatedException();
      return user;
    } catch (error) {
      throw new UserNotCreatedException();
    }
  }
}
