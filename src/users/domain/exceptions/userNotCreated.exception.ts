export class UserNotCreatedException extends Error {
  constructor() {
    super(`User not created`);
  }
}
