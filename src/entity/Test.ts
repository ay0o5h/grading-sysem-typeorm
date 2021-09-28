import {Entity, PrimaryGeneratedColumn, Column,CreateDateColumn, UpdateDateColumn, BaseEntity} from "typeorm";

@Entity()
export class Test extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @Column()
    num_of_question: number;
    @Column()
    total_marks: number;
    @Column()
    mark_of_each_question: number;
    @Column()
    date: Date;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
      //TODO: make Relations

}
