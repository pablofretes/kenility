export class UserNotFoundException extends Error {
  constructor(public readonly name: string) {
    super(`User ${name} not found`);
  }
}
