import { EntitySchema } from 'typeorm';

const UserSchema = new EntitySchema({
    name: 'User',
    tableName: 'users',
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        nombre: {
            type: "varchar",
            length: 50
        },
        email: {
            type: "varchar",
            length: 100,
            unique: true
        },
        password: {
            type: "varchar",
            length: 100
        },
        create_at: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP"
        }
    }
});

export default UserSchema;