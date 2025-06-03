import { Column, Entity, PrimaryColumn, Timestamp } from "typeorm";

@Entity()
export class User {

    @PrimaryColumn()
    username: string;

    @Column()
    password: string;

    @Column({ nullable: true})
    type: string;

    @Column( {type: 'timestamp', nullable: true} )
    row_version: Date;

    @Column({default: false })
    active: boolean;

}