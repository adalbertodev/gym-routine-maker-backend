import express, { Application } from 'express';
import http from 'http';

export class Server {
  private app: Application;
  private port: string;
  private httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.app = express();

    this.middleware();
  }

  private middleware = () => {
    this.app.use(express.json());
  };

  public listen = () => {
    this.httpServer = this.app.listen(this.port, () => {
      console.log(
        `App is running at http://localhost:${this.port} in ${this.app.get(
          'env'
        )} mode`
      );
      console.log('   Press CTRL-C to stop\n');
    });
  };

  public getHTTPServer = () => {
    return this.httpServer;
  };

  public stop = () => {
    if (this.httpServer) {
      this.httpServer.close();
    }
  };
}
