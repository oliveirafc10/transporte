import axios from "axios";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function authRoutes(app:FastifyInstance) {
  app.post('/register', async (request) =>{
    const bodySchema = z.object({
      code: z.string(),
    })

    const { code } = bodySchema.parse(request.body)

    const userResponse = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${code}`)

    const userSchema = z.object({
      id: z.string(),
      email: z.string(),
      name: z.string(),
      picture: z.string().url(),      
    })
    const userInfo = userSchema.parse(userResponse.data)
    
    let user = await prisma.user.findUnique({
      where: {
        googleId: userInfo.id,
      },
    })

    if(!user) {
      user = await prisma.user.create({
        data: {
          googleId: userInfo.id,
          login: userInfo.email,
          name: userInfo.name,
          avatarUrl: userInfo.picture,
        },
      })
    }
    const token = app.jwt.sign(
      {
        name: user.name,
        picture: user.avatarUrl,
      },
      {
        sub: user.id,
        expiresIn: '30 days',
      },
    )
    
    return {
      token
    }
  })
}