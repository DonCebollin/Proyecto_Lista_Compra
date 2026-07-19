import { EntitySchema } from 'typeorm';

const ProductosSchema = new EntitySchema({
    name: 'Productos',
    tableName: 'productos',
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        nombre: {
            type: "varchar",
            length: 100
        },
        created_at: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP"
        },
        updated_at: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP"
        }
    }
});

export default ProductosSchema;
