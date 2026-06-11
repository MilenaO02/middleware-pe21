# Documentación de pruebas del servidor

## Escenario A: Sin API Key
- **Comando:** `curl http://localhost:3000/health`
- **Salida:**
{"error":"API key inválida o ausente"}
Explicación: El servidor deniega el acceso con  acierto y responde con un estado de error debido a que no fue enviada la clave de autorización en los encabezados.
## Escenario B: Con clave válida
- **Comando:** `curl -H "x-api-key: secreto-demo" http://localhost:3000/health`
- **Salida:**
{"code":200,"status":"API saludable","date":"2026-06-11T17:16:54.735Z"}
Explicación: Al enviar la clave correcta de la API (secreto-demo), el servidor autentica de forma correcta la petición y responde con un código de estado 200 junto con el estado de salud de la aplicación.
## Escenario C: Ruta existente
- **Comando:** `curl -H "x-api-key: secreto-demo" http://localhost:3000/noexiste
- **Salida:**
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot GET /noexiste</pre>
</body>
</html>
Explicación: A pesar de que la clave sí es válida, el servidor responde con una estructura HTML de error indicando un "Cannot GET /noexiste" (error de tipo 404), porque no existe programada esa ruta.