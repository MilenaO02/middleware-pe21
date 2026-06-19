import { jest } from '@jest/globals';
import { type Request, type Response, type NextFunction } from 'express';
import { requireApiKey } from './auth.js';

describe('Pruebas para el Verificador de API Key', () => {

  it('debe devolver error 401 si no se envia la API Key', () => {
    // Peticion vacia, sin headers
    const req = { headers: {} } as Request;
    
    // Objeto res basico que guarda lo que el middleware le responda
    const res = {
      statusCode: 0,
      mensajeError: '',
      status: function(codigo: number) {
        (this as any).statusCode = codigo;
        return this;
      },
      json: function(contenido: any) {
        (this as any).mensajeError = contenido.error;
      }
    } as any;
    
    const next = jest.fn() as NextFunction;

    requireApiKey(req, res, next);

    // Comprobamos los resultados guardados en nuestro objeto basico
    expect(res.statusCode).toBe(401);
    expect(res.mensajeError).toBe('API key inválida o ausente');
    expect(next).not.toHaveBeenCalled(); // No debe continuar
  });

  it('debe devolver error 401 si la API Key es incorrecta', () => {
    // Usamos un objeto simple con 'any' para que no pelee por los headers
    const req = { 
      headers: { 'x-api-key': 'clave-falsa' } 
    } as any;
    
    const res = {
      statusCode: 0,
      status: function(codigo: number) { 
        (this as any).statusCode = codigo; 
        return this; 
      },
      json: function() {}
    } as any;
    
    const next = jest.fn() as any;

    requireApiKey(req, res, next);

    expect((res as any).statusCode).toBe(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('debe dejar pasar (llamar a next) si la API Key es correcta', () => {
    const req = { 
      headers: { 'x-api-key': 'secreto-demo' } 
    } as any;
    
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as any;
    
    const next = jest.fn() as any;

    requireApiKey(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});