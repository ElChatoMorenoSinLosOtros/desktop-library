SET TIME  ZONE 'UTC';

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "client" (
    "clientId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "typeUser" TEXT NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("clientId")
);

CREATE UNIQUE INDEX IF NOT EXISTS "client_email_key" ON "client"("email");

CREATE UNIQUE INDEX IF NOT EXISTS "client_phoneNumber_key" ON "client"("phoneNumber");

CREATE TABLE IF NOT EXISTS "admin" (
    "adminId" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "actions" JSON NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("adminId")
);

CREATE UNIQUE INDEX IF NOT EXISTS "admin_email_key" ON "admin"("email");

CREATE TABLE IF NOT EXISTS "material" (
    "materialId" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "publicationYear" INTEGER NOT NULL,
    "pageCount" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "type_material" TEXT NOT NULL,

    CONSTRAINT "material_pkey" PRIMARY KEY ("materialId")
);

CREATE UNIQUE INDEX IF NOT EXISTS "material_isbn_key" ON "material"("isbn");

CREATE TABLE IF NOT EXISTS "office" (
    "officeId" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT "office_pkey" PRIMARY KEY ("officeId")
);

CREATE UNIQUE INDEX IF NOT EXISTS "office_name_key" ON "office"("name");

CREATE TABLE IF NOT EXISTS "materials_changes" (
    "changeId" SERIAL PRIMARY KEY,
    "officeId" TEXT NOT NULL,
    "materialId" INTEGER NOT NULL,
    "changeType" TEXT NOT NULL,
    "changeDate" TIMESTAMPTZ DEFAULT NOW(),
    "oldData" JSONB,
    "newData" JSONB,

    CONSTRAINT "materials_changes_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "office"("officeId") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "materials_changes_officeId_index" ON "materials_changes"("officeId");

CREATE TABLE IF NOT EXISTS "loan" (
    "loanId" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "materialId" INTEGER NOT NULL,
    "loanDate" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnDate" TIMESTAMPTZ(3) NOT NULL,
    "returned" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "loan_pkey" PRIMARY KEY ("loanId"),
    CONSTRAINT "loan_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("clientId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "loan_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "material"("materialId") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "loan_loanId_key" ON "loan"("loanId");

CREATE TABLE IF NOT EXISTS "reserve" (
    "reserveId" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "materialId" INTEGER NOT NULL,
    "reserveDate" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "executeDate" TIMESTAMPTZ(3) NOT NULL,
    "returnDate" TIMESTAMPTZ(3) NOT NULL,
    "executed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "reserve_pkey" PRIMARY KEY ("reserveId"),
    CONSTRAINT "reserve_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "material"("materialId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "reserve_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("clientId") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "reserve_reserveId_key" ON "reserve"("reserveId");

CREATE TABLE IF NOT EXISTS "returns" (
    "returnId" SERIAL NOT NULL,
    "returnDate" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "loanId" INTEGER NOT NULL,

    CONSTRAINT "returns_pkey" PRIMARY KEY ("returnId"),
    CONSTRAINT "returns_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "loan"("loanId") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "returns_loanId_key" ON "returns"("loanId");

CREATE TABLE IF NOT EXISTS "notification" (
    "notificationId" SERIAL NOT NULL,
    "notificationName" TEXT NOT NULL,
    "notificationType" TEXT NOT NULL,
    "notificationDate" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notificationContent" TEXT,
    "notificationRead" BOOLEAN NOT NULL DEFAULT false,
    "loanId" INTEGER,
    "materialId" INTEGER,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("notificationId"),
    CONSTRAINT "notification_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "material"("materialId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "notification_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "loan"("loanId") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "notification_notificationId_key" ON "notification"("notificationId");
CREATE UNIQUE INDEX IF NOT EXISTS "notification_loanId_key" ON "notification"("loanId");
CREATE UNIQUE INDEX IF NOT EXISTS "notification_materialId_key" ON "notification"("materialId");

CREATE TABLE IF NOT EXISTS "fine" (
    "fineId" SERIAL NOT NULL,
    "debt" DECIMAL(65,30) NOT NULL,
    "paid" BOOLEAN NOT NULL,
    "clientId" INTEGER,
    "loanId" INTEGER,

    CONSTRAINT "fine_pkey" PRIMARY KEY ("fineId"),
    CONSTRAINT "fine_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("clientId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "fine_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "loan"("loanId") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "fine_loanId_key" ON "fine"("loanId");

CREATE OR REPLACE FUNCTION update_updatedAt()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_office_updatedAt
BEFORE UPDATE
ON "office"
FOR EACH ROW
EXECUTE FUNCTION update_updatedAt();

CREATE TRIGGER trigger_update_admin_updatedAt
BEFORE UPDATE
ON "admin"
FOR EACH ROW
EXECUTE FUNCTION update_updatedAt();
