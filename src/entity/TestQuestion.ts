import {Entity, PrimaryGeneratedColumn, Column,CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class TestQuestion {

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

}
