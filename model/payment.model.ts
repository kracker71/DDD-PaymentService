import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn } from "typeorm";

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id_payment!: number;

    @Column('varchar')
    user_name: string

    @Column('float')
    overall_price: number

    @Column('varchar')
    id_table : string

    @Column('int')
    id_order : number

    @Column('bool')
    is_delete: boolean = false

    @Column("bool")
    is_verify:boolean = false

    @CreateDateColumn()
    createAt: Date

    @UpdateDateColumn()
    updateAt: Date
}
