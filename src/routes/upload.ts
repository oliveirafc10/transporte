import { randomUUID } from "node:crypto";
import { extname, resolve } from "node:path";
import { FastifyInstance } from "fastify";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream"; //aguardar stream chegou ao final
import { promisify } from "node:util";

const pump = promisify(pipeline)

export async function uploadRoutes(app: FastifyInstance) {
  app.post('/upload', async (request, reply) => {
    const upload = await request.file({
      limits: {
        fileSize: 5_242_880, //5mb
      },
    })
    if (!upload) {
      return reply.status(400).send()
    }
    const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
    const IsValidFileFormat = mimeTypeRegex.test(upload.mimetype)

    if (!IsValidFileFormat) {
       return reply.status(400).send()
    }
    const fileId = randomUUID()
    const extension = extname(upload.filename)

    const fileName = fileId.concat(extension)
    const writeStream = createWriteStream(
      resolve(__dirname, '../../uploads', fileName) // pasta no servidor
    )
    await pump(upload.file, writeStream)

    const fulUrl = request.protocol.concat('://').concat(request.hostname)
    const fileUrl = new URL(`/uploads/${fileName}`, fulUrl).toString()

    //armazenar no clouflare R2 /Amazon S3/Google GCS

    return{ fileUrl }
  })

}
