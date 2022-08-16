import { Server } from './server';
import config from './config';

export class App {
  server?: Server;

  public start = () => {
    this.server = new Server(config.app.port);
    return this.server.listen();
  };

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  public stop = () => {
    this.server?.stop();
  };
}
