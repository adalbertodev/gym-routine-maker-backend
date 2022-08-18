export class UserNotExist extends Error {
  constructor(id: string) {
    super(`User ${id} not exist`);
  }
}
