CREATE TABLE "client" (
    "clientId" SERIAL NOT NULL,
    "name" TEXT,
    "lastName" TEXT,
    "address" TEXT,
    "email" TEXT,
    "phoneNumber" INTEGER,
    "typeUser" TEXT NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("clientId")
);


CREATE UNIQUE INDEX "user_email_key" ON "client"("email");
CREATE UNIQUE INDEX "user_phoneNumber_key" ON "client"("phoneNumber");

CREATE TABLE "admin" (
    "adminId" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("adminId")
);

CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

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

CREATE UNIQUE INDEX "material_isbn_key" ON "material"("isbn");

CREATE TABLE "loan" (
    "loanId" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "materialId" INTEGER NOT NULL,
    "loanDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnDate" TIMESTAMP(3),
    "returned" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "loan_pkey" PRIMARY KEY ("loanId")
);

-- CreateIndex
CREATE UNIQUE INDEX "loan_loanId_key" ON "loan"("loanId");
-- AddForeignKey
ALTER TABLE "loan" ADD CONSTRAINT "loan_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("clientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan" ADD CONSTRAINT "loan_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "material"("materialId") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updatedAt = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER update_trigger
BEFORE UPDATE ON "admin"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();
