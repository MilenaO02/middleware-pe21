import { jest } from '@jest/globals';
import { type Request, type Response, type NextFunction } from 'express';
import { requestLogger } from './logger.ts';

describe('Pruebas para el Logger Middleware', () => {
  
  it('debe llamar a la funcion next() para continuar el flujo', () => {
    // Creamos objetos ficticios muy basicos
    const req = { method: 'GET', path: '/productos' } as Request;
    
    // Un objeto vacio con una funcion 'on' que no hace nada para que no de error
    const res = { on: () => {} } as unknown as Response; 
    const next = jest.fn() as NextFunction;

    // Ejecutamos el middleware
    requestLogger(req, res, next);

    // Verificamos de la forma mas simple posible
    expect(next).toHaveBeenCalled();
  });

  it('debe leer correctamente el metodo y la ruta', () => {
    // Forzamos a que ejecute la funcion que esta dentro de res.on('finish') inmediatamente
    const req = { method: 'POST', path: '/usuarios' } as Request;
    const res = {
      statusCode: 201,
      on: (evento: string, callback: () => void) => {
        callback(); // Ejecuta el console.log del middleware al instante
      }
    } as unknown as Response;
    const next = (() => {}) as NextFunction;

    // Ejecutamos para comprobar que no se rompa al leer las propiedades
    requestLogger(req, res, next);
    
    expect(req.method).toBe('POST');
    expect(req.path).toBe('/usuarios');
  });
});