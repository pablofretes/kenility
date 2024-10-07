export class UserNotUpdatedException extends Error {
  constructor(public readonly uuid: string) {
    super(`User with UUID ${uuid} could not be updated`);
  }
}
