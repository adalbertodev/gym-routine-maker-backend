export class ExerciseNotExist extends Error {
  constructor(id: string) {
    super(`Exercise ${id} not exist`);
  }
}
