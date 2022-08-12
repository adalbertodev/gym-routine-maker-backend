export class UserExercisesAlreadyExists extends Error {
  constructor(id: string) {
    super(`User Exercises ${id} already exists`);
  }
}
