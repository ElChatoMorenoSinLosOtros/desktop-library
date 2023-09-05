SET TIME ZONE 'UTC';

CREATE TABLE IF NOT EXISTS "main_material" (
    "materialId" SERIAL NOT NULL,
    "officeId" TEXT NOT NULL,
    "materialOfficeId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "publicationYear" INTEGER NOT NULL,
    "pageCount" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "type_material" TEXT NOT NULL,

    CONSTRAINT "main_material_pkey" PRIMARY KEY ("materialId")
);
