import express from 'express';
import cors from 'cors';
import apiModuleLoader from './api-module-loader';

const app: express.Express = express();

// add middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// api用moduleのロード(非同期)
apiModuleLoader(app).then((handler) => app.use(handler));

// listen when production
if (import.meta.env.PROD) {
  app.listen(3000);
}

export const viteNodeApp = app;
