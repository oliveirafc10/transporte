-- CreateTable
CREATE TABLE "manutencao" (
    "id" SERIAL NOT NULL,
    "km" INTEGER NOT NULL,
    "veiculoId" INTEGER NOT NULL,
    "tipoServico" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,
    "realizado" BOOLEAN NOT NULL DEFAULT false,
    "local" TEXT NOT NULL,
    "dataRealizado" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "manutencao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "veiculo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "veiculo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "veiculo_nome_key" ON "veiculo"("nome");

-- AddForeignKey
ALTER TABLE "manutencao" ADD CONSTRAINT "manutencao_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "veiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
