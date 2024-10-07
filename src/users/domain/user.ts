import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';

export class User implements UserEntity {
  name: string;
  lastname: string;
  address: string;
  profilePicture: string;
  password: string;
  uuid: string;

  constructor({
    name,
    lastname,
    address,
    profilePicture,
    password,
  }: UserEntity) {
    this.name = name;
    this.lastname = lastname;
    this.address = address;
    this.profilePicture = profilePicture;
    this.password = password;
    this.uuid = uuid();
  }
}
