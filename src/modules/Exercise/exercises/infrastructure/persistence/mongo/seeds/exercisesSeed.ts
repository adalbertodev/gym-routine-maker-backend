import dotenv from 'dotenv';

import { Exercise } from '../../../../domain/Exercise';
import { ExerciseConnectionManager } from '../../ExerciseConnectionManager';
import { exercisesSeedData } from './exercisesSeedData';

export const exerciseSeed = async(): Promise<void> => {
  dotenv.config({ path: '.env.dev' });
  const repository = ExerciseConnectionManager.connect();

  const exercises = exercisesSeedData.map((exerciseSeedData) =>
    Exercise.fromPrimitives(exerciseSeedData)
  );

  await repository.reset();

  for (const exercise of exercises) {
    await repository.save(exercise);
  }

  ExerciseConnectionManager.disconnect();
};

exerciseSeed();
