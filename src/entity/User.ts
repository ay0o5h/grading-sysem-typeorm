import {Entity, PrimaryGeneratedColumn, Column,CreateDateColumn, UpdateDateColumn, BaseEntity} from "typeorm";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    phone: number;
    @Column()
    password: string;
    @Column()
    otp: number;
    @Column()
    otpNewPassword: number;
    @Column({default:false})
    isVerfied:boolean
    @Column({default:false})
    isActive:boolean
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

}
