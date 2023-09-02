-- CreateTable for Client
CREATE TABLE IF NOT EXISTS "client" (
    "clientId" SERIAL NOT NULL,
    "name" TEXT,
    "lastName" TEXT,
    "address" TEXT,
    "email" TEXT,
    "phoneNumber" INTEGER,
    "typeUser" TEXT NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("clientId")
);

-- CreateIndex for Client
CREATE UNIQUE INDEX IF NOT EXISTS "client_email_key" ON "client"("email");

-- CreateIndex for Client
CREATE UNIQUE INDEX IF NOT EXISTS "client_phoneNumber_key" ON "client"("phoneNumber");


-- CreateTable for Admin
CREATE TABLE IF NOT EXISTS "admin" (
    "adminId" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("adminId")
);


-- CreateIndex for Admin
CREATE UNIQUE INDEX IF NOT EXISTS "admin_email_key" ON "admin"("email");


-- CreateTable for Material
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

-- CreateIndex for Material
CREATE UNIQUE INDEX IF NOT EXISTS "material_isbn_key" ON "material"("isbn");


-- CreateTable for Loan
CREATE TABLE IF NOT EXISTS "loan" (
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
-- CreateIndex for Loan
CREATE UNIQUE INDEX IF NOT EXISTS "loan_loanId_key" ON "loan"("loanId");
-- Check if the foreign key constraint already exists for loan_clientId_fkey
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM   information_schema.table_constraints
        WHERE  constraint_name = 'loan_clientId_fkey'
    ) THEN
        ALTER TABLE "loan" ADD CONSTRAINT "loan_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("clientId") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
END $$;

-- Check if the foreign key constraint already exists for loan_materialId_fkey
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM   information_schema.table_constraints
        WHERE  constraint_name = 'loan_materialId_fkey'
    ) THEN
        ALTER TABLE "loan" ADD CONSTRAINT "loan_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "material"("materialId") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
END $$;
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
