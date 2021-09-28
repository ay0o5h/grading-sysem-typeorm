import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";

@Entity()
export class StudentAnswer extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    answer: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
  //TODO: make Relations
}
