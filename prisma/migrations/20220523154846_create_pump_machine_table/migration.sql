-- CreateTable
CREATE TABLE "pumpMachine" (
    "id" BIGSERIAL NOT NULL,
    "pumpName" VARCHAR(255) NOT NULL,
    "meter" DECIMAL(65,30) NOT NULL,
    "pumpOperatorsId" BIGINT NOT NULL,
    "tanksId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pumpMachine_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pumpMachine" ADD CONSTRAINT "pumpMachine_pumpOperatorsId_fkey" FOREIGN KEY ("pumpOperatorsId") REFERENCES "pumpOperators"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pumpMachine" ADD CONSTRAINT "pumpMachine_tanksId_fkey" FOREIGN KEY ("tanksId") REFERENCES "tanks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
