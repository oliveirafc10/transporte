/*
  Warnings:

  - You are about to drop the `veiculo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "manutencao" DROP CONSTRAINT "manutencao_veiculoId_fkey";

-- DropTable
DROP TABLE "veiculo";

-- CreateTable
CREATE TABLE "car" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "car_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "car_nome_key" ON "car"("nome");

-- AddForeignKey
ALTER TABLE "manutencao" ADD CONSTRAINT "manutencao_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
