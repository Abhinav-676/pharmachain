import { MigrationBuilder, type ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.sql('DROP POLICY IF EXISTS store_isolation_policy ON stores_inventories;');
    pgm.sql('DROP POLICY IF EXISTS warehouse_isolation_policy ON warehouses_inventories;');

    pgm.sql('ALTER TABLE stores_inventories DISABLE ROW LEVEL SECURITY;');
    pgm.sql('ALTER TABLE warehouses_inventories DISABLE ROW LEVEL SECURITY;');
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.sql('ALTER TABLE stores_inventories ENABLE ROW LEVEL SECURITY;');
    pgm.sql('ALTER TABLE warehouses_inventories ENABLE ROW LEVEL SECURITY;');

    pgm.sql(`
        CREATE POLICY store_isolation_policy ON stores_inventories
        USING (store_id = current_setting('app.current_store_id', true)::uuid);
    `);

    pgm.sql(`
        CREATE POLICY warehouse_isolation_policy ON warehouses_inventories
        USING (warehouse_id = current_setting('app.current_warehouse_id', true)::uuid);
    `);
}
