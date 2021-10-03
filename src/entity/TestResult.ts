import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne } from "typeorm";
import { Test } from "./Test";
import { User } from "./User";

@Entity()
export class TestResult extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  result: number;
  @Column()
  no_of_right_qsn: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  //TODO: make Relations
  @ManyToOne((type) => User, (user) => user.testResults)
  user: User;
  @ManyToOne((type) => Test, (test) => test.testResults)
  test: Test;
}
