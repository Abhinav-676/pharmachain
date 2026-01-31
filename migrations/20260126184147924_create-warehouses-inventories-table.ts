import { type ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('warehouses_inventories', {
        product_id: { type: 'uuid', notNull: true, references: 'products(id)', onDelete: 'CASCADE' },
        warehouse_id: { type: 'uuid', notNull: true, references: 'warehouses(id)', onDelete: 'CASCADE' },
        quantity: { type: 'integer', notNull: true, default: 0 },
        created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
        updated_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') }
    });

    // Composite primary key
    pgm.addConstraint('warehouses_inventories', 'warehouses_inventories_pkey', { primaryKey: ['product_id', 'warehouse_id'] });

    // Single-column indexes for faster single-column filtering
    pgm.createIndex('warehouses_inventories', ['product_id'], { name: 'idx_warehouses_inventories_product_id' });
    pgm.createIndex('warehouses_inventories', ['warehouse_id'], { name: 'idx_warehouses_inventories_warehouse_id' });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropIndex('warehouses_inventories', 'idx_warehouses_inventories_product_id', { ifExists: true });
    pgm.dropIndex('warehouses_inventories', 'idx_warehouses_inventories_warehouse_id', { ifExists: true });
    pgm.dropConstraint('warehouses_inventories', 'warehouses_inventories_pkey', { ifExists: true });
    pgm.dropTable('warehouses_inventories');
}
