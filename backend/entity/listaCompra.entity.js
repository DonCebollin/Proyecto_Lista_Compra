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
        total: {
            type: "decimal",
            precision: 10,
            scale: 2,
            default: 0
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
        usuarios: {
            target: "User",
            type: "many-to-many",
            joinTable: {
                name: "listas_usuarios",
                joinColumn: {
                    name: "lista_id",
                    referencedColumnName: "id"
                },
                inverseJoinColumn: {
                    name: "user_id",
                    referencedColumnName: "id"
                }
            }
        },
        items: {
            target: "ItemLista",
            type: "one-to-many",
            inverseSide: "lista"
        }
    }
});

export default ListaCompraSchema;
