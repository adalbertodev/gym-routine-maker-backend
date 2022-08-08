import { usersSeedData } from '../../../../../Auth/infrastructure/persistence/mongo/seeds/usersSeedData';
import { UserExercisesPrimitive } from '../../../../domain/interfaces';

export const usersExercisesSeedData: UserExercisesPrimitive[] = [
  {
    _id: usersSeedData[0]._id,
    exercises: [
      {
        _id: 'a4062ef3-db11-4f98-8dea-5272bedf151b',
        name: 'Press Banca',
        muscle: 'Pectoral',
        barWeight: 20,
        rm: null
      },
      {
        _id: '6e43a625-885f-4608-905c-c34414f3acf7',
        name: 'Dominadas',
        muscle: 'Espalda',
        barWeight: null,
        rm: null
      },
      {
        _id: '38521c5e-750c-41d7-8339-395410d2a98e',
        name: 'Press Militar',
        muscle: 'Hombros',
        barWeight: 20,
        rm: null
      },
      {
        _id: 'd542f4b5-b140-4d92-85cc-8c1fff94f1b3',
        name: 'Fondos',
        muscle: 'Tríceps',
        barWeight: null,
        rm: null
      },
      {
        _id: '2a210b09-8a3d-4144-8f7f-a54073a4d32e',
        name: 'Curl Bíceps',
        muscle: 'Bíceps',
        barWeight: null,
        rm: null
      },
      {
        _id: '9433e78f-ac85-4b60-8d92-7cb2aedd74fd',
        name: 'Plancha',
        muscle: 'Abdominal',
        barWeight: null,
        rm: null
      }
    ]
  },
  {
    _id: usersSeedData[1]._id,
    exercises: [
      {
        _id: '1b97672d-f70e-4f6b-a6df-fe0cfc14267f',
        name: 'Press Palof',
        muscle: 'Oblicuos',
        barWeight: null,
        rm: null
      },
      {
        _id: 'f20d488e-1837-45b3-9aa3-6e8aba94f204',
        name: 'Sentadilla',
        muscle: 'Cuádriceps',
        barWeight: 20,
        rm: null
      },
      {
        _id: '48ea2255-a78f-4f42-af02-d67514fe6c0d',
        name: 'Peso Muerto',
        muscle: 'Glúteos',
        barWeight: 20,
        rm: null
      },
      {
        _id: '05721015-335a-4c9d-b987-f409f0f1d780',
        name: 'Curl Femoral',
        muscle: 'Isquiotibiales',
        barWeight: null,
        rm: null
      },
      {
        _id: 'f8e53242-91a0-4254-b9f5-91dad0d3a866',
        name: 'Elevación de Talones',
        muscle: 'Gemelos',
        barWeight: null,
        rm: null
      }
    ]
  }
];
