CREATE TABLE IF NOT EXISTS "user" (
    "clientId" SERIAL NOT NULL,
    "name" TEXT,
    "lastName" TEXT,
    "address" TEXT,
    "email" TEXT,
    "phoneNumber" INTEGER,
    "typeUser" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("clientId")
);

CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

CREATE UNIQUE INDEX "user_phoneNumber_key" ON "user"("phoneNumber");

CREATE TABLE IF NOT EXISTS "Admins" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Admins_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Admins_email_key" ON "Admins"("email");

CREATE TABLE IF NOT EXISTS "material" (
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

CREATE UNIQUE INDEX "material_isbn_key" ON "material"("isbn");

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updatedAt = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER update_trigger
BEFORE UPDATE ON "Admins"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();
