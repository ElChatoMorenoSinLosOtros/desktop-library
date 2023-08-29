-- CreateTable
CREATE TABLE "Admins" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "clientId" SERIAL NOT NULL,
    "name" TEXT,
    "lastName" TEXT,
    "address" TEXT,
    "email" TEXT,
    "phoneNumber" INTEGER,
    "typeUser" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("clientId")
);

-- CreateTable
CREATE TABLE "material" (
    "materialId" SERIAL NOT NULL,
    "title" TEXT,
    "author" TEXT,
    "category" TEXT,
    "isbn" TEXT,
    "publicationYear" INTEGER,
    "pageCount" INTEGER,
    "quantity" INTEGER,
    "available" BOOLEAN NOT NULL,
    "type_material" TEXT NOT NULL,

    CONSTRAINT "material_pkey" PRIMARY KEY ("materialId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admins_email_key" ON "Admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_phoneNumber_key" ON "user"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "material_isbn_key" ON "material"("isbn");
