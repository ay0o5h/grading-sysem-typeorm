import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class TestResult {

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

}
