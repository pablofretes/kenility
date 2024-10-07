export class PasswordNotHashedException extends Error {
  constructor() {
    super('Password not hashed');
  }
}
