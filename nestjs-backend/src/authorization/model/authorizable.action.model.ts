import { BaseModel } from "src/database/model/base.model";
import { Column, Entity } from "typeorm";

/**
 * under construction:
 * Every action which needs to be authorized.
 * ex: name="URL:GET:*admin\*"
 */
@Entity()
export class AuthorizableAction extends BaseModel {

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    status: string;

}