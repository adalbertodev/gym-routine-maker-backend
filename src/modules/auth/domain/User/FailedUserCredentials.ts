export class FailedUserCredentials extends Error {
  constructor() {
    super('El email y/o la contraseña son incorrectas.');
  }
}
