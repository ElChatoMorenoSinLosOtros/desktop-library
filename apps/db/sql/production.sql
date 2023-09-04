CREATE OR REPLACE FUNCTION material_insert_trigger()
RETURNS TRIGGER AS $$
DECLARE
  "first_office_id" UUID;
BEGIN
    SELECT "officeId" INTO "first_office_id"
    FROM "office"
    ORDER BY "officeId"
    LIMIT 1;

    INSERT INTO "materials_changes" ("officeId", "materialId", "changeType", "oldData", "newData")
    VALUES ("first_office_id", NEW."materialId", 'insert', NULL, to_jsonb(NEW));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER material_insert
AFTER INSERT ON "material"
FOR EACH ROW
EXECUTE FUNCTION material_insert_trigger();

CREATE OR REPLACE FUNCTION material_update_trigger()
RETURNS TRIGGER AS $$
DECLARE
  "first_office_id" UUID;
BEGIN
    SELECT "officeId" INTO "first_office_id"
    FROM "office"
    ORDER BY "officeId"
    LIMIT 1;

    INSERT INTO "materials_changes" ("officeId", "materialId", "changeType", "oldData", "newData")
    VALUES ("first_office_id", NEW."materialId", 'update', to_jsonb(OLD), to_jsonb(NEW));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER material_update
AFTER UPDATE ON "material"
FOR EACH ROW
WHEN (OLD.* IS DISTINCT FROM NEW.*)
EXECUTE FUNCTION material_update_trigger();

CREATE OR REPLACE FUNCTION material_delete_trigger()
RETURNS TRIGGER AS $$
DECLARE
  "first_office_id" UUID;
BEGIN
    SELECT "officeId" INTO "first_office_id"
    FROM "office"
    ORDER BY "officeId"
    LIMIT 1;

    INSERT INTO "materials_changes" ("officeId", "materialId", "changeType", "oldData", "newData")
    VALUES ("first_office_id", OLD."materialId", 'delete', to_jsonb(OLD), NULL);
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER material_delete
AFTER DELETE ON "material"
FOR EACH ROW
EXECUTE FUNCTION material_delete_trigger();
