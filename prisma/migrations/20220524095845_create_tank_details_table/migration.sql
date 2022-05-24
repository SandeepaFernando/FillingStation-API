-- CreateTable
CREATE TABLE "tankDetails" (
    "id" BIGSERIAL NOT NULL,
    "startMeter" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "endMeter" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "sell" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "wastage" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "cost" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanksId" BIGINT NOT NULL,
    "pumpOperatorsId" BIGINT NOT NULL,
    "refillsId" BIGINT,

    CONSTRAINT "tankDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tankDetails" ADD CONSTRAINT "tankDetails_pumpOperatorsId_fkey" FOREIGN KEY ("pumpOperatorsId") REFERENCES "pumpOperators"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tankDetails" ADD CONSTRAINT "tankDetails_tanksId_fkey" FOREIGN KEY ("tanksId") REFERENCES "tanks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tankDetails" ADD CONSTRAINT "tankDetails_refillsId_fkey" FOREIGN KEY ("refillsId") REFERENCES "refills"("id") ON DELETE SET NULL ON UPDATE CASCADE;
