import { BaseEntity, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Course } from './Course';


@Entity()
export class CourseEnrollment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;


    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
    //TODO: make Relations


    @ManyToOne((type) => Course, (course) => course.courseEnrollment)
    courses: Course[];



}
