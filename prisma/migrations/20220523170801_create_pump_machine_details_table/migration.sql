/*
  Warnings:

  - You are about to drop the `pumpMachine` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "pumpMachine" DROP CONSTRAINT "pumpMachine_pumpOperatorsId_fkey";

-- DropForeignKey
ALTER TABLE "pumpMachine" DROP CONSTRAINT "pumpMachine_tanksId_fkey";

-- DropTable
DROP TABLE "pumpMachine";

-- CreateTable
CREATE TABLE "pumpMachines" (
    "id" BIGSERIAL NOT NULL,
    "pumpName" VARCHAR(255) NOT NULL,
    "meter" DECIMAL(65,30) NOT NULL,
    "pumpOperatorsId" BIGINT NOT NULL,
    "tanksId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pumpMachines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pumpMachineDetails" (
    "id" BIGSERIAL NOT NULL,
    "startMeter" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "endMeter" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pumpOperatorsId" BIGINT NOT NULL,
    "pumpMachinesId" BIGINT NOT NULL,

    CONSTRAINT "pumpMachineDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pumpMachines" ADD CONSTRAINT "pumpMachines_pumpOperatorsId_fkey" FOREIGN KEY ("pumpOperatorsId") REFERENCES "pumpOperators"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pumpMachines" ADD CONSTRAINT "pumpMachines_tanksId_fkey" FOREIGN KEY ("tanksId") REFERENCES "tanks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pumpMachineDetails" ADD CONSTRAINT "pumpMachineDetails_pumpOperatorsId_fkey" FOREIGN KEY ("pumpOperatorsId") REFERENCES "pumpOperators"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pumpMachineDetails" ADD CONSTRAINT "pumpMachineDetails_pumpMachinesId_fkey" FOREIGN KEY ("pumpMachinesId") REFERENCES "pumpMachines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
