import { useExpressServer } from 'routing-controllers';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
//import cors from 'cors';
import initConnection from './utils/dbconnectors';
import UserController from './controllers/UserController';
import AuthController from './controllers/AuthController';
import AuthorController from './controllers/AuthorController';
class Server {
  private app;
  constructor() {
    this.dbConnect();
    this.app = express();
  }

  private config() {
    //this.app.use(cors({origin:'https://192.168.1.90:8080/', credentials:true,}));
    this.app.use(helmet());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json({ limit: '1mb' }));
  }

  private dbConnect() {
    initConnection();
  }

  public start = (port: number) => {
    this.config();
    useExpressServer(this.app, {
      defaultErrorHandler: false,
      cors: {
        origin: 'http://localhost:8080',
        credentials: true, //access-control-allow-credentials:true
      },
      controllers: [UserController, AuthController, AuthorController],
    });
    return new Promise((resolve, reject) => {
      this.app
        .listen(port, () => {
          resolve(port);
        })
        .on('error', (err: any) => reject(err));
    });
  };
}

export default Server;
