import { EntitySchema } from 'typeorm';

const ItemListaSchema = new EntitySchema({
    name: 'ItemLista',
    tableName: 'items_lista',
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        cantidad: {
            type: "int",
            default: 1
        },
        comprado: {
            type: "boolean",
            default: false
        },
        marcado_en: {
            type: "timestamp",
            nullable: true
        }
    },
    relations: {
        lista: {
            target: "ListaCompra",
            type: "many-to-one",
            joinColumn: {
                name: "lista_id"
            },
            onDelete: "CASCADE"
        },
        producto: {
            target: "Productos",
            type: "many-to-one",
            joinColumn: {
                name: "producto_id"
            },
            onDelete: "RESTRICT"
        }
    }
});

export default ItemListaSchema;
