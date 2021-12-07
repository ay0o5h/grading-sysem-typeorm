import { BaseEntity, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Course } from './Course';
import { User } from "./User";


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
    @ManyToOne((type) => User, (user) => user.courseEnrollment)
    users: User[];


}
