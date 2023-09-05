import datetime
import psycopg2
from tzlocal import get_localzone
import pytz
import sys

local_timezone = pytz.timezone(get_localzone().__str__())


def convert_to_utc(timestamp_str):
    local_time = local_timezone.localize(datetime.datetime.strptime(timestamp_str, '%Y-%m-%d %H:%M:%S'))
    utc_time = local_time.astimezone(pytz.utc)
    return utc_time.strftime('%Y-%m-%d %H:%M:%S')


def last_changes(cursor, last_sync):
    cursor.execute("""
        SELECT
            "officeId",
            "materialId" AS materialOfficeId,
            "changeType",
            "newData"->>'title' AS title,
            "newData"->>'author' AS author,
            "newData"->>'category' AS category,
            "newData"->>'isbn' AS isbn,
            ("newData"->>'publicationYear')::INTEGER AS publicationYear,
            ("newData"->>'pageCount')::INTEGER AS pageCount,
            ("newData"->>'quantity')::INTEGER AS quantity,
            CASE WHEN "newData"->>'available' = 'true' THEN TRUE ELSE FALSE END AS available,
            "newData"->>'type_material' AS type_material
        FROM
            materials_changes
        WHERE
            "changeDate" > %s
    """, (last_sync,))

    changes = cursor.fetchall()
    if len(changes) == 0:
        print("No changes")
        return None
    return changes


def send_changes_to_main_server(changes):
    if len(sys.argv) == 2:
        destination_host = sys.argv[1]
    else:
        destination_host = "localhost"
    
    try:
        conn_principal = psycopg2.connect(
            host=destination_host,
            database="main",
            user="root",
            password="root",
            port="4040"
        )
    except psycopg2.Error:
        print("Error while connecting to Destination PostgreSQL at host: " + destination_host)
        exit(0)
            
    cursor = conn_principal.cursor()

    try:
        for change in changes:
            (office_id, material_office_id, change_type, title, author, category, isbn,
             publication_year, page_count, quantity, available, type_material) = change
            if change_type == "insert":
                cursor.execute("""
                    INSERT INTO "main_material" ("officeId", "materialOfficeId", "title", "author", "category",
                    "isbn", "publicationYear", "pageCount", "quantity", "available", "type_material")
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """, (office_id, material_office_id, title, author, category, isbn,
                      publication_year, page_count, quantity, available, type_material))
            elif change_type == "update":
                cursor.execute("""
                    UPDATE main_material SET "officeId" = %s, "materialOfficeId" = %s, title = %s,
                     author = %s, category = %s, isbn = %s, "publicationYear" = %s,
                     "pageCount" = %s, quantity = %s, available = %s, type_material = %s
                     WHERE "officeId" = %s AND "materialOfficeId" = %s;
                """, (office_id, material_office_id, title, author, category, isbn,
                      publication_year, page_count, quantity, available, type_material, office_id, material_office_id))
            elif change_type == "delete":
                cursor.execute("""
                    DELETE FROM main_material WHERE "materialOfficeId" = %s AND "officeId" = %s;
                """, (material_office_id, office_id))
    except psycopg2.Error:
        conn_principal.close()
        cursor.close()
        print("Error while sending changes to Destination PostgreSQL")
        exit(0)

    conn_principal.commit()
    cursor.close()
    conn_principal.close()


def main():
    try:
        local_conn = psycopg2.connect(
            host="localhost",
            database="library",
            user="user",
            password="password",
            port="3030"
        )
    except psycopg2.Error:
        print("Error while connecting to Source PostgreSQL")
        exit(0)

    local_cursor = local_conn.cursor()

    actual_date = datetime.datetime.now()

    last_sync = actual_date - datetime.timedelta(minutes=5)

    last_sync_str = last_sync.strftime("%Y-%m-%d %H:%M:%S")

    last_sync_utc = convert_to_utc(last_sync_str)

    changes = last_changes(local_cursor, last_sync_utc)

    if changes is None:
        local_cursor.close()
        local_conn.close()
        exit(0)

    send_changes_to_main_server(changes)

    local_cursor.close()
    local_conn.close()


if __name__ == "__main__":
    main()
