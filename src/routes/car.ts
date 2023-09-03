import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { prisma } from "../lib/prisma";

export async function carRoutes(app: FastifyInstance) {

  app.get('/car', async () => { 
    const car = await prisma.car.findMany({
      orderBy: {
        nome: 'desc'
      },
    })
    return car.map(car =>{
       return {
        id: car.id,
        nome: car.nome,
        marca: car.marca,
        modelo: car.modelo,
        createdAt: car.createdAt
      }
    })
  })

  app.get('/car/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.coerce.number(),
    })
    const { id } = paramsSchema.parse(request.params)

    const car = await prisma.car.findUniqueOrThrow({
      where: {
        id,
      },
    })
    
    return car
  })

  app.post('/car', async (request) => {    
    const bodySchema = z.object({
      nome: z.string(),
      marca: z.string(),
      modelo: z.string(),
    })
    const { nome, marca, modelo } = bodySchema.parse(request.body)
    const car = await prisma.car.create({
      data: {
        nome,
        marca,
        modelo,
      },      
    })
    return car
  })

  app.put('/car/:id', async (request, reply) => {
    
    const paramsSchema = z.object({
      id: z.coerce.number(),
      })
      console.log(paramsSchema)
    const { id } = paramsSchema.parse(request.params)
    const bodySchema = z.object({
      nome: z.string(),
      marca: z.string(),
      modelo: z.string(),
    })
  
    const { nome, marca, modelo } = bodySchema.parse(request.body)
    let car = await prisma.car.findFirstOrThrow({
      where: {
      id,
      }
    })
  
    car = await prisma.car.update({
      where: {
        id
      },
      data: {
        nome,
        marca,
        modelo
        
      },
      })
      return car
    })

  app.delete('/car/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.coerce.number(),
    })
    const { id } = paramsSchema.parse(request.params)
    
    const car = await prisma.car.findFirstOrThrow({
      where: {
      id,
      }
    })

      console.log(id)
    await prisma.car.delete({
      where: {
        id,
      },
    })
  })
}