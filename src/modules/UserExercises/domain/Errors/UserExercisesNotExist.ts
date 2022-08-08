export class UserExercisesNotExist extends Error {
  constructor(id: string) {
    super(`User Exercises ${id} not exist`);
  }
}
