import { createHmac } from 'crypto';

const secret = process.env.JWT_SECRET ?? 'secreto-demo-pe23';

function base64Url(str) {
  return Buffer.from(str).toString('base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

const header  = base64Url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
const payload = base64Url(JSON.stringify({
  sub:   '20251042',
  iss:   'https://auth.uide.edu.ec',
  aud:   'https://api.uide.edu.ec/inscripciones',
  scope: 'inscripciones:write',
  exp:   Math.floor(Date.now() / 1000) + 3600,
  jti:   crypto.randomUUID()
}));

const sig = createHmac('sha256', secret)
  .update(`${header}.${payload}`)
  .digest('base64url');

console.log(`${header}.${payload}.${sig}`);
