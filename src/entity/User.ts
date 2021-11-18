import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Course } from "./Course";
import { StudentAnswer } from "./StudentAnswer";
import { TestResult } from "./TestResult";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;
  @Column()
  password: string;

  @Column({ nullable: true })
  image: string;
  @Column({ default: true })
  isActive: boolean;
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  //TODO: make Relations
  @OneToMany((type) => TestResult, (testResult) => testResult.user)
  testResults: TestResult[];
  @OneToMany((type) => StudentAnswer, (studentAnswer) => studentAnswer.user)
  studentAnswers: StudentAnswer[];

  @ManyToMany(() => Course, course => course.users)
  @JoinTable()
  courses: Course[];

}
