import { Server } from './server';

export class App {
  server?: Server;

  public start = () => {
    const port = process.env.PORT || '5000';
    this.server = new Server(port);
    return this.server.listen();
  };

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  public stop = () => {
    this.server?.stop();
  };
}
