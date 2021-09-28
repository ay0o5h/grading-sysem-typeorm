import {Entity, PrimaryGeneratedColumn, Column,CreateDateColumn, UpdateDateColumn, BaseEntity} from "typeorm";

@Entity()
export class CourseEnrollment extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  //TODO: make Relations
}
