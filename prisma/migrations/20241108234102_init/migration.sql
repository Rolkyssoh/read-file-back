-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "company" TEXT NOT NULL,
    "siren" BIGINT NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "rib" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);
