import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { prisma } from "../lib/prisma";

export async function fuelRoutes(app: FastifyInstance) {

  app.get('/fuel', async () => { 
    const fuel = await prisma.fuel.findMany({
      orderBy: {
        createdAt: 'asc'
      },
    })
    return fuel.map(fuel =>{
       return {
        id: fuel.id,
        km: fuel.km,
        valor: fuel.valor,
        local: fuel.local,
        caminhao: fuel.caminhao,
        createdAt: fuel.createdAt,
      }
    })
  })

  app.get('/fuel/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().cuid(),
    })
    const { id } = paramsSchema.parse(request.params)

    const trip = await prisma.trips.findUniqueOrThrow({
      where: {
        id,
      },
    })
    
    return trip
  })

  app.post('/fuel', async (request) => {    
    console.log(request.body, 'zodi')
    const bodySchema = z.object({
      km: z.coerce.number(),
      litros: z.coerce.number(),
      valor: z.coerce.number(),
      local: z.string(),
      caminhao: z.string(),      
    })
    console.log(request.body, 'zodi-ok')
    const { km, litros, valor, local, caminhao } = bodySchema.parse(request.body)
    console.log(request.body, 'cadastro')
    const fuel = await prisma.fuel.create({
      data: {
        km,
        litros,
        valor,
        local,
        caminhao,                
      },      
    })
    console.log(fuel, 'data')    
    return fuel
  })

  app.put('/fuel:id', async (request, reply) => {
  const paramsSchema = z.object({
    id: z.string().cuid(),
  })
  const { id } = paramsSchema.parse(request.params)

  const bodySchema = z.object({
    nota: z.string(),
    peso: z.string(),
    origem: z.string(),
    destino: z.string(),
    caminhao: z.string(),
    valor: z.number(),
    observacao: z.string(),
    
    isPublic: z.coerce.boolean().default(false),
  })

  const { nota, peso, origem, destino, caminhao, valor, observacao, isPublic } = bodySchema.parse(request.body)
  let trip = await prisma.trips.findFirstOrThrow({
    where: {
    id,
    }
  })

  trip = await prisma.trips.update({
    where: {
      id
    },
    data: {
      nota,
      peso,
      origem,
      destino,
      caminhao,
      valor,
      observacao,
      
    },
    })
    return trip
  })

  app.delete('/fuel:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().cuid(),
    })
    const { id } = paramsSchema.parse(request.params)

    const trip = await prisma.trips.findFirstOrThrow({
      where: {
      id,
      }
    })


    await prisma.trips.delete({
      where: {
        id,
      },
    })
  })
  
}