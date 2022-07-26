import express, { Application, Router } from 'express';
import http from 'http';

import cookieParser from 'cookie-parser';

import { registerRoutes } from './routes';
import config from './config';

export class Server {
  private app: Application;
  private port: string;
  private httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.app = express();
    this.app.set('env', config.env);

    this.middleware();

    const router = Router();
    this.app.use(router);
    this.app.use('/api', registerRoutes(router));
  }

  private middleware = () => {
    this.app.use(express.json());
    this.app.use(cookieParser());
  };

  public listen = () => {
    this.httpServer = this.app.listen(this.port, () => {
      console.log(`App is running at http://localhost:${this.port} in ${this.app.get('env')} mode`);
      console.log('\nPress CTRL-C to stop...');
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
