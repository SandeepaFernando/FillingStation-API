-- CreateTable
CREATE TABLE "tanks" (
    "id" BIGSERIAL NOT NULL,
    "remainQty" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "itemsId" BIGINT NOT NULL,
    "usersId" BIGINT NOT NULL,

    CONSTRAINT "tanks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tanks" ADD CONSTRAINT "tanks_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tanks" ADD CONSTRAINT "tanks_itemsId_fkey" FOREIGN KEY ("itemsId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
