import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Test } from "./Test";
import { TestQuestion } from "./TestQuestion";
import { User } from "./User";


@Entity()
export class StudentAnswer extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  answer: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  //TODO: make Relations
  @ManyToOne((type) => User, (user) => user.studentAnswers)
  user: User;
  @ManyToOne((type) => Test, (test) => test.studentAnswers)
  test: Test;
  @OneToOne(() => TestQuestion)
  @JoinColumn()
  testQuestion: TestQuestion;
}
