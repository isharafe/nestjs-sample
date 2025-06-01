import { BaseModel } from "src/database/model/base.model";
import { Column, Entity } from "typeorm";

@Entity()
export class TestModel extends BaseModel {

    @Column()
    name: string;

    @Column()
    description: string;

}