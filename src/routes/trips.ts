import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { prisma } from "../lib/prisma";


export async function tripsRoutes(app: FastifyInstance) {

  app.get('/trips', async () => { 
    const trips = await prisma.trips.findMany({
          orderBy: {
            createdAt: 'desc'        
          },
          

      
    })
    
    return trips.map(trip =>{
       return {
        id: trip.id,
        nota: trip.nota,
        peso: trip.peso,
        origem: trip.origem,
        destino: trip.destino,
        caminhao: trip.caminhao,
        valor: trip.valor,
        observacao: trip.observacao.substring(0, 85).concat('...'),      
        createdAt: trip.createdAt,
      }
      
    })
    
  })

  app.get('/trips/:id', async (request, reply) => {
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

  app.post('/trips', async (request) => {    
    
    const bodySchema = z.object({
      nota: z.string(),
      peso: z.string(),
      origem: z.string(),
      destino: z.string(),
      caminhao: z.string(),
      valor: z.coerce.number(),
      observacao: z.string(),      
    })
    
    const { nota, peso, origem, destino, caminhao, valor, observacao } = bodySchema.parse(request.body)
    
    const trip = await prisma.trips.create({
      
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
    console.log(trip, 'data')    
    return trip    
  })

  app.put('/trips/:id', async (request, reply) => {
    
  const paramsSchema = z.object({
    id: z.string().cuid(),
    })
    console.log(paramsSchema)
    
  const { id } = paramsSchema.parse(request.params)
  console.log(id)
  const bodySchema = z.object({
    createdAt: z.coerce.date(),
    nota: z.string(),
    peso: z.string(),
    origem: z.string(),
    destino: z.string(),
    caminhao: z.string(),
    valor: z.coerce.number(),
    observacao: z.string(),
  })

  const { createdAt, nota, peso, origem, destino, caminhao, valor, observacao } = bodySchema.parse(request.body)
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
      createdAt,
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

  app.delete('/trips/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().cuid(),
    })
    const { id } = paramsSchema.parse(request.params)
    
    const trip = await prisma.trips.findFirstOrThrow({
      where: {
      id,
      }
    })

      console.log(id)
    await prisma.trips.delete({
      where: {
        id,
      },
    })
  })
  
}