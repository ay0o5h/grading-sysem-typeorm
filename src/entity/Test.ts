import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToMany } from "typeorm";
import { Admin } from "./Admin";
import { Course } from "./Course";
import { StudentAnswer } from "./StudentAnswer";
import { TestQuestion } from "./TestQuestion";
import { TestResult } from "./TestResult";
import { User } from "./User";

@Entity()
export class Test extends BaseEntity {

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
  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  //TODO: make Relations
  @ManyToOne((type) => Course, (course) => course.tests)
  course: Course;
  @ManyToOne((type) => Admin, (admin) => admin.tests)
  admin: Admin;
  @OneToMany((type) => TestQuestion, (testQuestion) => testQuestion.test)
  testQuestions: TestQuestion[];
  @OneToMany((type) => TestResult, (testResult) => testResult.test)
  testResults: TestResult[];
  @OneToMany((type) => StudentAnswer, (studentAnswer) => studentAnswer.test)
  studentAnswers: StudentAnswer[]

}
