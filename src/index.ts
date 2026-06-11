import express, {type Request, type Response, type NextFunction} from 'express';
import { requestLogger } from './middlewares/logger.js';
import { requireApiKey } from './middlewares/auth.js';

const app = express();
//Usando Middleware
app.use(express.json());
app.use(requestLogger);
app.use(requireApiKey);
// const no se puede reasignar un valor, es constante
// let se puede setear el valor, es variable
// var es para declarar variables globales

const port = 3000;
app.get('/health', (req: Request, res: Response) => {
    res.json(
        {
        code: 200,
        status: "API saludable",
        ts: new Date().toISOString()
    }
);
    res.send('Hello World.');
});
app.use((_err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(3000, () => {
    console.log("Servidor iniciado en el puerto 3000");
});

