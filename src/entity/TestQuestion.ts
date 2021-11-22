import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Test } from "./Test";


@Entity()
export class TestQuestion extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    qsn: string;
    @Column()
    optionA: string;
    @Column()
    optionB: string;
    @Column()
    optionC: string;
    @Column()
    optionD: string;
    @Column()
    right_answer: string;
    @Column()
    qsn_no: number;


    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
    //TODO: make Relations
    @ManyToOne((type) => Test, (test) => test.testQuestions)
    test: Test;

}
