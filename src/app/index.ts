import { App } from './App';

try {
  new App().start();
} catch (error: any) {
  console.log(error);
  process.exit(1);
}
