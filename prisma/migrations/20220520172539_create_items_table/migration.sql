-- CreateTable
CREATE TABLE "items" (
    "id" BIGSERIAL NOT NULL,
    "itemName" VARCHAR(255) NOT NULL,
    "qty" INTEGER DEFAULT 0,
    "min" INTEGER DEFAULT 0,
    "max" INTEGER DEFAULT 0,
    "cost" DECIMAL(65,30) DEFAULT 0,
    "sellingPrice" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "measurementType" INTEGER,
    "editable" BOOLEAN NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vendorsId" BIGINT NOT NULL,
    "usersId" BIGINT NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_vendorsId_fkey" FOREIGN KEY ("vendorsId") REFERENCES "vendors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
