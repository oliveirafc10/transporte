import 'dotenv/config'

import { fastify } from "fastify";
import cors from "@fastify/cors";
import jwt, { JWT } from '@fastify/jwt';
import multipart from '@fastify/multipart';
import { resolve } from 'node:path';

import { authRoutes } from './routes/auth';
import { tripsRoutes } from "./routes/trips";
import { fuelRoutes } from "./routes/fuel";
import { uploadRoutes } from './routes/upload';
const app = fastify();

app.register(multipart)

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads'
})

app.register(cors, {
  origin: true, // liberado para todos ou ['https://localhost:3000'],
})

app.register(jwt, {
  secret: 'spacetime',
  })

app.register(authRoutes)
app.register(tripsRoutes)
app.register(fuelRoutes)
app.register(uploadRoutes)

app.listen({
  host: '0.0.0.0',
  port: process.env.Port ? Number(process.env.PORT) : 3333,
}).then(() => {
  console.log("HTTP server running")
})