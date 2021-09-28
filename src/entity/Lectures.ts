import {Entity, PrimaryGeneratedColumn, Column,CreateDateColumn, UpdateDateColumn, BaseEntity} from "typeorm";

@Entity()
export class Lectures extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @Column()
    link: string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  //TODO: make Relations
}
