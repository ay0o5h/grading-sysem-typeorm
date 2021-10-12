import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany } from "typeorm";
import { Course } from "./Course";
import { Test } from "./Test";

@Entity()
export class Admin extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  phone: string;
  @Column()
  password: string;

  @Column()
  image: string;
  @Column({ nullable: true })
  otp: number;
  @Column({ nullable: true })
  otpNewPassword: number;
  @Column({ default: false })
  isVerfied: boolean
  @Column({ default: true })
  isActive: boolean
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  //TODO: make Relations 
  @OneToMany((type) => Course, (course) => course.admin)
  courses: Course[];
  @OneToMany((type) => Test, (test) => test.admin)
  tests: Test[];
}
