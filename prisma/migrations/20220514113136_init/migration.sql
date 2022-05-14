-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "nic" TEXT,
    "userRole" INTEGER NOT NULL DEFAULT 1,
    "cashInHand" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_userName_key" ON "users"("userName");
