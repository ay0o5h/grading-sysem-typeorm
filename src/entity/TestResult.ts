import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";

@Entity()
export class TestResult extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    result: number;
    @Column()
    no_of_right_qsn: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
      //TODO: make Relations

}
