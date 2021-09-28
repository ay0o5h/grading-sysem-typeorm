import {Entity, PrimaryGeneratedColumn, Column,CreateDateColumn, UpdateDateColumn, BaseEntity} from "typeorm";

@Entity()
export class Course extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  //TODO: make Relations
}
