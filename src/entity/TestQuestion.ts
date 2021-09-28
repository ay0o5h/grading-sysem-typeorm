import {Entity, PrimaryGeneratedColumn, Column,CreateDateColumn, UpdateDateColumn, BaseEntity} from "typeorm";

@Entity()
export class TestQuestion extends BaseEntity{

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
}
