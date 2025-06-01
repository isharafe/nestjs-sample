import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";


export abstract class BaseModel {

    static ID_FIELD_NAME = "id";
    static VERSION_FIELD_NAME = "version";
    static CREATED_FIELD_NAME = "createdAt";
    static UPDATED_FIELD_NAME = "updatedAt";
    static DELETED_FIELD_NAME = "deletedAt";
    

    @PrimaryGeneratedColumn()
    id?: number;

    @VersionColumn()
    version?: number;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    // for soft deletions
    @DeleteDateColumn()
    deletedAt?: Date;

}