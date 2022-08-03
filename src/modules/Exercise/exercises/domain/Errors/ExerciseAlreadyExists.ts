export class ExerciseAlreadyExists extends Error {
  constructor(id: string) {
    super(`Exercise ${id} already exists`);
  }
}
