import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { Admin } from "./Admin";
import { Lectures } from "./Lectures";
import { Test } from "./Test";

import { User } from "./User";

@Entity()
export class Course extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  //TODO: make Relations

  @ManyToMany(() => User, user => user.courses)
  users: User[];
  @ManyToOne((type) => Admin, (admin) => admin.courses)
  admin: Admin;
  @OneToMany((type) => Test, (test) => test.course)
  tests: Test[];
  @OneToMany((type) => Lectures, (lecture) => lecture.course)
  lectures: Lectures[];

}
