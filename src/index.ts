import express, {type Request, type Response, type NextFunction} from 'express';
import { requestLogger } from './middlewares/logger.js';
import { requireJwt } from './middlewares/auth.js';
import { rateLimiter }  from './middlewares/rateLimiter.js';
// importar las rutas v1 y v2 para inscripciones
import v1Inscripciones from './routes/v1/inscripciones.js';
import v2Inscripciones from './routes/v2/inscripciones.js';


const app = express();
//Usando Middleware
app.use(express.json());
app.use(requestLogger);
app.use(requireJwt);
app.use(rateLimiter);
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
});
app.use('/v1/inscripciones', v1Inscripciones);
app.use('/v2/inscripciones', v2Inscripciones);


app.use((_err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(port, () => {
    console.log("Servidor iniciado en el puerto 3000");
});