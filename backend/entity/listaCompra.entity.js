import { EntitySchema } from 'typeorm';

const ListaCompraSchema = new EntitySchema({
    name: 'ListaCompra',
    tableName: 'listas_compra',
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        estado: {
            type: "varchar",
            length: 20,
            default: "abierta"
        },
        created_at: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP"
        },
        closed_at: {
            type: "timestamp",
            nullable: true
        }
    },
    relations: {
        assignedUser: {
            target: "User",
            type: "many-to-one",
            joinColumn: {
                name: "assigned_to"
            },
            onDelete: "SET NULL",
            nullable: true
        },
        items: {
            target: "ItemLista",
            type: "one-to-many",
            inverseSide: "lista"
        }
    }
});

export default ListaCompraSchema;
