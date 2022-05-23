-- CreateTable
CREATE TABLE "refills" (
    "id" BIGSERIAL NOT NULL,
    "refillAmount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cost" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "tanksId" BIGINT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refills_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "refills" ADD CONSTRAINT "refills_tanksId_fkey" FOREIGN KEY ("tanksId") REFERENCES "tanks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
